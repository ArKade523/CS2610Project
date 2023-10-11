import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import credentials from './credentials.json';

const jwtSecret = credentials.jwtSecret;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token; // Assuming you're using a middleware like cookie-parser
  
    if (!token) {
        return res.status(403).json({ message: 'Not authorized' });
    }
  
    try {
        const decoded = jwt.verify(token, jwtSecret);
        // req.user = decoded; // Add user info to request object
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default verifyToken;