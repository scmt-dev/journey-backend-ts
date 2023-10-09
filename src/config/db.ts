import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'journeydb',
  password: process.env.DB_PASS || 'password',
  port: 5432,
});

export default pool;
