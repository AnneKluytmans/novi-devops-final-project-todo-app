const request = require('supertest');
const app = require('../../src/app');
const { pool } = require('../../src/db');

describe('Todos API (integration)', () => {

  beforeEach(async () => {
    await pool.query('DELETE FROM todos');
  });

  afterAll(async () => {
    await pool.end();
  });

  // -------------------------
  // POST /todos
  // -------------------------

  describe('POST /todos', () => {

    it('should create a new todo and return 201', async () => {
      const response = await request(app)
        .post('/api/todos')
        .send({ title: 'Learn integration testing' });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('Learn integration testing');
      expect(response.body.completed).toBe(false);
    });

    it('should persist the todo in the database', async () => {
      const response = await request(app)
        .post('/api/todos')
        .send({ title: 'Database check' });

      const dbResult = await pool.query(
        'SELECT * FROM todos WHERE id = $1',
        [response.body.id]
      );

      expect(dbResult.rowCount).toBe(1);
      expect(dbResult.rows[0].title).toBe('Database check');
    });

    it('should trim whitespace from title', async () => {
      const response = await request(app)
        .post('/api/todos')
        .send({ title: '   Trim me   ' });

      expect(response.status).toBe(201);
      expect(response.body.title).toBe('Trim me');
    });

    it('should return 400 if title is missing', async () => {
      const response = await request(app)
        .post('/api/todos')
        .send({ title: '' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

  });

});
