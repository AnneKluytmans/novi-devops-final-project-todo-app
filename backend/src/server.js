require('dotenv').config();

const app = require('./app');
const { testConnection } = require('./db');
const initDb = require('./db/init');
const setupGracefulShutdown = require('./config/shutdown');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await testConnection();
    await initDb();

    const server = app.listen(PORT, () => {
      console.log(`🚀 API running on port ${PORT}`);
    });

    setupGracefulShutdown(server);
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
})();