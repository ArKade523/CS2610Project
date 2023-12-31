import express, { Express, Request, Response, Application, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import path from 'path';
import bodyParser from 'body-parser';
import { MySQLDatabase } from './mysqlDatabase';
import { UserData } from './types/userTypes';
import credentials from './credentials.json';
import verifyToken from './verifyToken';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import generatePhrase from './generatePhrase';

const USING_HTTPS = false;

const localConfig = {
    host: credentials.dbHost,
    user: credentials.dbUser,
    database: credentials.dbName,
    password: credentials.dbPassword,
};

const localDBManager = new MySQLDatabase(localConfig);

const app: Application = express();
const port = process.env.PORT || 3000;

// Set up the sveltekit frontend
app.use(express.static(path.resolve('../frontend-web/build')));

// Set up the body parser middleware to parse JSON packets
app.use(bodyParser.json());

// Set up the cookie parser middleware
app.use(cookieParser());

// Serve SvelteKit frontend
app.use(express.static(path.resolve('../frontend-web/build')));

// Set up the JWT middleware
const jwtSecret = credentials.jwtSecret;

app.post('/api/register', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  // TODO: Add more validations as necessary
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Incomplete data provided' });
  }

  try {
    // Database Manager handles hashing the password
    await localDBManager.createUser(username, email, password);

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    
    // TODO: Handle different types of errors (e.g., unique constraint failed) and send appropriate responses
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// /api/login endpoint
app.post('/api/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const user = await localDBManager.findUserByUsername(username);

    if (!user) {
      // Don't be too specific with the error message for security reasons.
      // You don't want to inform attackers whether a username exists or not.
      return res.status(401).json({ message: 'Invalid login credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid login credentials' });
    }
    
    // Create a JWT token
    let token;
    try {
      token = jwt.sign({ userData: user }, jwtSecret, {
        expiresIn: '1h' // expires in 1 hour
      });

    } catch (error) {
      console.error('Error during JWT signing:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    // Set HttpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: USING_HTTPS,
      maxAge: 3600000 // 1 hour in milliseconds
    });

    // At this point, the user is authenticated.
    res.json({ message: 'Login successful', user: {username: username, name: username} });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// /api/userData endpoint
app.get('/api/userData', (req: Request, res: Response) => {
  const token = req.cookies.token; // Get the token from the cookie
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  try {
    const { userData } = jwt.verify(token, jwtSecret) as { userData: UserData };
    res.json(userData);
  } catch (error) {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// /api/logout endpoint stub
app.post('/api/logout', (req: Request, res: Response) => {
  res.clearCookie('token').json({ message: 'Logged out successfully' });
});

// /api/prompt endpoint
app.get('/api/prompt', (req: Request, res: Response) => {
  // Define the path to your file
  const filePath: string = path.join(__dirname, '../phrase.json');

  // Check if the file exists and read it
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File doesn't exist, generate a new phrase
        generatePhrase(filePath, res);
      } else {
        // Some other error
        return res.status(500).send('Error reading the file.');
      }
    } else {
      // File exists, check the timestamp
      const fileContent = JSON.parse(data.toString());
      const oneHourAgo = new Date(Date.now() - 3600000);

      if (new Date(fileContent.timestamp) < oneHourAgo) {
        // The stored phrase is more than one hour old, generate a new one
        generatePhrase(filePath, res);
      } else {
        // The stored phrase is still valid, return it
        res.json({ phrase: fileContent.phrase });
      }
    }
  });
});

// Stub for /api/forgot-password
app.post('/api/forgot-password', (req: Request, res: Response) => {
  console.log('Received data for /api/forgot-password:', req.body);
  res.json({ message: 'Forgot-password endpoint hit', data: req.body });
});

// Api to verify the JWT token
app.get('/api/verify-token', verifyToken, (req: Request, res: Response) => {
  const token = req.cookies.token; // Assuming you're using cookie-parser

  if (!token) {
    return res.status(401).json({ message: 'No token provided', valid: false });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    res.status(200).json({ message: 'Token is valid', valid: true });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', valid: false });
  }
});

app.get('/health-check', (req: Request, res: Response) => {
  res.send('OK');
});

// Catch-all route to delegate to SvelteKit
app.get('*', (req: Request, res: Response, next: NextFunction) => {
  // If no API route matched, delegate to SvelteKit
  if (!req.route) {
    return next();
  }
  res.sendFile(path.resolve('../frontend-web/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
