const { pool } = require('../db');

function setupGracefulShutdown() {
  process.on('SIGTERM', async () => {
    console.log('SIGTERM received, closing DB connections...');
    await pool.end();
    process.exit(0);
  });
}

module.exports = setupGracefulShutdown;