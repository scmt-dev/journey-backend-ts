import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken library
import pool from '../config/db';
import { appSecret } from '../config/app';

class AuthController {
  async signup(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;

    // Check if the email or password is empty
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and Password required' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // Check if the user already exists
      const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

      if (userExists.rows[0]) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const result = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, hashedPassword]);

      return res.json({ user: result.rows[0] });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async signin(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;

    try {
      // check email and password empty
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and Password required' });
      }

      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

      const user = result.rows[0];

      if (user) {
        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          const token = jwt.sign(
            { userId: user.id, email: user.email },
            appSecret, // Replace with your secret key
            { expiresIn: '5h' }, // Set token expiration time
          );

          // Generate Refresh Token
          const refreshToken = jwt.sign(
            { userId: user.id },
            appSecret, // Replace with your refresh secret key
            { expiresIn: '7d' }, // Set refresh token expiration time
          );

          return res.json({
            message: 'Signin successful',
            token,
            refreshToken,
          });
        }
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      return res.status(404).json({ error: 'User not found' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async refreshToken(req: Request, res: Response): Promise<any> {
    const { refreshToken } = req.body;

    try {
      // Verify the refresh token
      const decoded = jwt.verify(refreshToken, appSecret);

      // Check if the decoded payload contains the necessary information
      // eslint-disable-next-line no-prototype-builtins
      if (typeof decoded === 'object' && decoded.hasOwnProperty('userId')) {
        // Look up the user in the database (optional, depending on your requirements)
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.userId]);

        const user = result.rows[0];

        if (user) {
          // Generate a new access token
          const newAccessToken = jwt.sign({ userId: user.id, email: user.email }, appSecret, { expiresIn: '5h' });

          // refreshToken
          const newRefreshToken = jwt.sign({ userId: user.id }, appSecret, {
            expiresIn: '7d',
          });

          return res.json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          });
        }
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(401).json({ error: 'Invalid refresh token' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new AuthController();
