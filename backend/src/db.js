const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`
    CREATE TABLE todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      completed BOOLEAN
    )
  `);

  // Seed data
  db.run(
    `INSERT INTO todos (title, completed) VALUES
      ('Write Dockerfile', 1),
      ('Build CI/CD pipeline', 0),
      ('Write documentation', 0)
    `
  );

});

module.exports = db;