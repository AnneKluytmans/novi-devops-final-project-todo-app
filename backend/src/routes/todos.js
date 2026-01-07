const express = require('express');
const { pool } = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM todos ORDER BY id'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('GET todos failed:', err);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

router.post('/', async (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO todos (title) VALUES ($1) RETURNING *',
      [title.trim()]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('CREATE todo failed:', err);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

router.put('/:id', async (req, res) => {
  const { completed } = req.body;

  try {
    const result = await pool.query(
      'UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *',
      [completed, req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.sendStatus(200);
  } catch (err) {
    console.error('UPDATE todo failed:', err);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM todos WHERE id = $1 RETURNING *',
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.sendStatus(204);
  } catch (err) {
    console.error('DELETE todo failed:', err);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

module.exports = router;