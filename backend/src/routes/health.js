const express = require('express');
const { pool } = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'novisoft-todo-api',
    environment: process.env.NODE_ENV || 'development',
    container: require('os').hostname(),
  });
});

router.get('/db', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'healthy', database: 'connected' });
  } catch {
    res.status(500).json({ status: 'unhealthy' });
  }
});

module.exports = router;