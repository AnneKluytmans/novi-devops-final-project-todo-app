const { pool } = require('./index');

async function initDb() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL UNIQUE, 
        completed BOOLEAN DEFAULT false
      )
    `);

    if (process.env.NODE_ENV === 'development') {
      await pool.query(`
        INSERT INTO todos (title, completed)
        VALUES
          ('Write Dockerfile', true),
          ('Design CI/CD pipeline', true),
          ('Build CI/CD pipeline', false)
        ON CONFLICT DO NOTHING
      `);
    }

    console.log('✅ Database initialized');
  } catch (err) {
    console.error('❌ Database initialization failed:', err.message);
    process.exit(1);
  }
}

module.exports = initDb;