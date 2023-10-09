import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { appSecret } from '../config/app';

// Define a custom type for the Request object with user_id
interface CustomRequest extends Request {
  userId?: number; // Adjust the type accordingly
}

export const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  // Extract the token from the request headers
  const token = req.headers.authorization?.split(' ')[1];

  try {
    if (token) {
      // Verify the token
      const decoded = jwt.verify(token, appSecret);

      // Check if the decoded payload contains the necessary information
      // eslint-disable-next-line no-prototype-builtins
      if (typeof decoded === 'object' && decoded.hasOwnProperty('userId')) {
        if (decoded.userId) {
          // Add user_id to the request object
          req.userId = decoded.userId;
          // Continue to the next middleware or route handler
          next();
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      } else {
        res.status(401).json({ error: 'Invalid token' });
      }
    } else {
      res.status(401).json({ error: 'Token not provided' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
