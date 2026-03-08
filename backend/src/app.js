const express = require('express');
const cors = require('cors');
const todosRouter = require('./routes/todos');
const healthRouter = require('./routes/health');

const app = express();

app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173', 
  process.env.FRONTEND_URL,
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  }
}));


app.use('/api/todos', todosRouter);
app.use('/health', healthRouter);

module.exports = app;