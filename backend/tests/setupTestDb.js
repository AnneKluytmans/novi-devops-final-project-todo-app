const { pool } = require('../src/db');

jest.setTimeout(30000);

async function waitForDb(pool, retries = 30, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      await pool.query('SELECT 1');
      console.log('✅ Postgres is ready');
      return;
    } catch (err) {
      console.log(`Waiting for Postgres... (${i + 1}/${retries}) - ${err.message}`);
      await new Promise(r => setTimeout(r, delay));
    }
  }
  throw new Error('❌ Postgres did not become ready in time');
}

beforeAll(async () => {
  await waitForDb(pool);

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