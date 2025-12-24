const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
  db.all('SELECT * FROM todos', [], (err, rows) => {
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { title } = req.body;
  db.run(
    'INSERT INTO todos (title, completed) VALUES (?, false)',
    [title],
    function () {
      res.json({ id: this.lastID, title, completed: false });
    }
  );
});

router.put('/:id', (req, res) => {
  const { completed } = req.body;
  db.run(
    'UPDATE todos SET completed = ? WHERE id = ?',
    [completed, req.params.id],
    () => res.sendStatus(200)
  );
});

router.delete('/:id', (req, res) => {
  db.run('DELETE FROM todos WHERE id = ?', req.params.id, () =>
    res.sendStatus(204)
  );
});

module.exports = router;