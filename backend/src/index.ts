import express, { Express, Request, Response, Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const app: Application = express();
const port = process.env.PORT || 3000;

// Set up the sveltekit frontend
app.use(express.static(path.resolve('../frontend-web/build')));

// Set up the body parser middleware to parse JSON packets
app.use(bodyParser.json());

// Stub for /api/register
app.post('/api/register', (req: Request, res: Response) => {
  console.log('Received data for /api/register:', req.body);
  res.json({ message: 'Register endpoint hit', data: req.body });
});

// Stub for /api/login
app.post('/api/login', (req: Request, res: Response) => {
  console.log('Received data for /api/login:', req.body);
  res.json({ message: 'Login endpoint hit', data: req.body });
});

// Stub for /api/forgot-password
app.post('/api/forgot-password', (req: Request, res: Response) => {
  console.log('Received data for /api/forgot-password:', req.body);
  res.json({ message: 'Forgot-password endpoint hit', data: req.body });
});

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve('../frontend-web/build/index.html'))  
});

app.get('/health-check', (req: Request, res: Response) => {
    res.send('OK');
});

app.get('/api/register', (req: Request, res: Response) => {
    res.send('OK'); 
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
