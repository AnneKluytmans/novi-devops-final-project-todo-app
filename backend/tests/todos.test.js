const request = require('supertest');
const express = require('express');
const todosRouter = require('../src/routes/todos')

jest.mock('../src/db', () => ({
  pool: {
    query: jest.fn(),
  },
}));

const { pool } = require('../src/db');

const app = express();
app.use(express.json());
app.use('/api/todos', todosRouter);

describe('POST /api/todos', () => {
  it('creates a new todo', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 1, title: 'New todo', completed: false }],
    });

    const res = await request(app)
      .post('/api/todos')
      .send({ title: 'New todo' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('New todo');
  });

  it('returns 400 when title is missing', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({});

    expect(res.statusCode).toBe(400);
  });
});

describe('GET /api/todos', () => {
  it('returns all todos', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [
        { id: 1, title: 'Test todo', completed: false },
      ],
    });

    const res = await request(app).get('/api/todos');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([
      { id: 1, title: 'Test todo', completed: false },
    ]);

    expect(pool.query).toHaveBeenCalledWith(
      'SELECT * FROM todos ORDER BY id'
    );
  });
});

describe('GET /api/todos/:id', () => {
  it('returns a single todo by id', async () => {
    pool.query.mockResolvedValueOnce({
      rowCount: 1,
      rows: [
        { id: 1, title: 'Test todo', completed: false },
      ],
    });

    const res = await request(app).get('/api/todos/1');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      title: 'Test todo',
      completed: false,
    });

    expect(pool.query).toHaveBeenCalledWith(
      'SELECT * FROM todos WHERE id = $1',
      ['1']
    );
  });

  it('returns 404 if todo does not exist', async () => {
    pool.query.mockResolvedValueOnce({
      rowCount: 0,
      rows: [],
    });

    const res = await request(app).get('/api/todos/999');

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: 'Todo not found' });
  });
});

describe('PUT /api/todos/:id', () => {
  it('updates a todo', async () => {
    pool.query.mockResolvedValueOnce({
      rowCount: 1,
      rows: [{ id: 1, completed: true }],
    });

    const res = await request(app)
      .put('/api/todos/1')
      .send({ completed: true });

    expect(res.statusCode).toBe(200);
  });

  it('returns 404 if todo not found', async () => {
    pool.query.mockResolvedValueOnce({
      rowCount: 0,
      rows: [],
    });

    const res = await request(app)
      .put('/api/todos/999')
      .send({ completed: true });

    expect(res.statusCode).toBe(404);
  });
});


describe('DELETE /api/todos/:id', () => {
  it('deletes a todo', async () => {
    pool.query.mockResolvedValueOnce({
      rowCount: 1,
      rows: [{ id: 1 }],
    });

    const res = await request(app).delete('/api/todos/1');

    expect(res.statusCode).toBe(204);
  });

  it('returns 404 when todo does not exist', async () => {
    pool.query.mockResolvedValueOnce({
      rowCount: 0,
      rows: [],
    });

    const res = await request(app).delete('/api/todos/999');

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: 'Todo not found' });
  });
});