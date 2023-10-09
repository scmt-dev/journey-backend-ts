// Import necessary modules and libraries
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import pool from '../config/db';
import { appSecret } from '../config/app';

class UserController {
  // Route to get the profile of the authenticated user
  async getProfile(req: Request, res: Response): Promise<any> {
    // Extract the token from the request headers
    const token: any = req.headers.authorization?.split(' ')[1];

    try {
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Verify the token
      const decoded: any = jwt.verify(token, appSecret);

      // Check if the decoded payload contains the necessary information
      // eslint-disable-next-line no-prototype-builtins
      if (typeof decoded === 'object' && decoded.hasOwnProperty('userId')) {
        // Look up the user in the database
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.userId]);

        const user = result.rows[0];

        if (user) {
          // Return the user profile
          // remove the password from the user object
          delete user.password;
          return res.json({ user });
        }
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(401).json({ error: 'Invalid token' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new UserController();
