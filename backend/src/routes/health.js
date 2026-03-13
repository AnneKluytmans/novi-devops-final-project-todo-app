const express = require('express');
const rateLimit = require('express-rate-limit');
const { pool } = require('../db');
const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: { error: 'Too many requests, try again later.' }
});

router.use(limiter);

router.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    version: '1.3.0',
    service: 'novisoft-todo-api',
    environment: process.env.NODE_ENV || 'production',
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