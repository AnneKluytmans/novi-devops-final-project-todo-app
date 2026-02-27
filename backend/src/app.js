const express = require('express');
const todosRouter = require('./routes/todos');
const healthRouter = require('./routes/health');

const app = express();

app.use(express.json());
app.use('/api/todos', todosRouter);
app.use('/health', healthRouter);

module.exports = app;