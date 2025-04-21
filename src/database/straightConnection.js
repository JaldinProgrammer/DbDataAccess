import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // you can also pass ssl, max, idleTimeoutMillis, etc.
});

export default pool;
