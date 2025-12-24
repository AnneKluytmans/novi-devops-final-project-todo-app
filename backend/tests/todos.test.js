const request = require('supertest');
const app = require('../src/app');

test('POST creates a todo', async () => {
  const res = await request(app)
    .post('/api/todos')
    .send({ title: 'Test todo' });

  expect(res.statusCode).toBe(200);
  expect(res.body.title).toBe('Test todo');
  expect(res.body.completed).toBe(false);
});

test('GET returns all todos', async () => {
  await request(app)
    .post('/api/todos')
    .send({ title: 'Another todo' });

  const res = await request(app).get('/api/todos');

  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBeGreaterThan(0);
});

test('PUT updates a todo', async () => {
  const postRes = await request(app)
    .post('/api/todos')
    .send({ title: 'Update me' });

  const todoId = postRes.body.id;

  const putRes = await request(app)
    .put(`/api/todos/${todoId}`)
    .send({ completed: true });

  expect(putRes.statusCode).toBe(200);

  const getRes = await request(app).get('/api/todos');
  const updatedTodo = getRes.body.find(t => t.id === todoId);

  expect(updatedTodo.completed).toBe(true);
});

test('DELETE removes a todo', async () => {
  const postRes = await request(app)
    .post('/api/todos')
    .send({ title: 'Delete me' });

  const todoId = postRes.body.id;

  const deleteRes = await request(app)
    .delete(`/api/todos/${todoId}`);

  expect(deleteRes.statusCode).toBe(204);

  const getRes = await request(app).get('/api/todos');
  const deletedTodo = getRes.body.find(t => t.id === todoId);

  expect(deletedTodo).toBeUndefined();
});