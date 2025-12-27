const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
  db.all('SELECT * FROM todos', [], (err, rows) => {
    if (err) {
      console.error('GET todos failed:', err);
      return res.status(500).json({ error: 'Failed to fetch todos' });
    }
    const todos = rows.map(todo => ({
      id: todo.id,
      title: todo.title,
      completed: Boolean(todo.completed)
    }));
    res.json(todos);
  });
});

router.post('/', (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  db.run(
    'INSERT INTO todos (title, completed) VALUES (?, ?)',
    [title.trim(), 0],
    function (err) {
      if (err) {
        console.error('CREATE todo failed:', err);
        return res.status(500).json({ error: 'Failed to create todo' });
      }

      res.status(201).json({
        id: this.lastID,
        title: title.trim(),
        completed: false
      });
    }
  );
});

router.put('/:id', (req, res) => {
  const completed = req.body.completed ? 1 : 0;
  const id = req.params.id;

  db.run(
    'UPDATE todos SET completed = ? WHERE id = ?',
    [completed, id],
    function (err) {
      if (err) {
        console.error('UPDATE todo failed:', err);
        return res.status(500).json({ error: 'Failed to update todo' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      res.sendStatus(200);
    }
  );
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  db.run(
    'DELETE FROM todos WHERE id = ?', 
    [id],
    function (err) {
      if (err) {
        console.error('DELETE todo failed:', err);
        return res.status(500).json({ error: 'Failed to delete todo' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      res.sendStatus(204);
    }
  );
});

module.exports = router;