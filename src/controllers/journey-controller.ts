import { Response } from 'express';
import pool from '../config/db';

class JourneyController {
  async createJourney(req: any, res: Response): Promise<any> {
    const { description } = req.body;

    try {
      if (!description) {
        return res.status(400).json({ error: 'Missing required fields description' });
      }

      const result = await pool.query('INSERT INTO journey (description, user_id) VALUES ($1, $2) RETURNING *', [description, req.userId]);

      const journey = result.rows[0];

      return res.json({ journey });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getJourney(req: any, res: Response): Promise<any> {
    try {
      const { limit = 10, offset = 0 } = req.query;
      const result = await pool.query('SELECT * FROM journey WHERE user_id = $1 LIMIT $2 OFFSET $3', [req.userId, limit, offset]);

      const journey = result.rows;

      return res.json({ journey });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // delete
  async deleteJourney(req: any, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const result = await pool.query('DELETE FROM journey WHERE id = $1 AND user_id = $2 RETURNING *', [id, req.userId]);

      const journey = result.rows[0];

      if (!journey) {
        return res.status(404).json({ error: 'Journey not found' });
      }

      return res.json({ journey });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // update
  async updateJourney(req: any, res: Response): Promise<any> {
    const { id } = req.params;
    const { description } = req.body;

    try {
      const result = await pool.query('UPDATE journey SET description = $1 WHERE id = $2 AND user_id = $3 RETURNING *', [
        description,
        id,
        req.userId,
      ]);

      const journey = result.rows[0];

      if (!journey) {
        return res.status(404).json({ error: 'Journey not found' });
      }

      return res.json({ journey });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new JourneyController();
