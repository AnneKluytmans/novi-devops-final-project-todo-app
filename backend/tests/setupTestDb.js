const { pool } = require('../src/db');

beforeAll(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      completed BOOLEAN DEFAULT false
    );
  `);
});

afterAll(async () => {
  await pool.end();
});