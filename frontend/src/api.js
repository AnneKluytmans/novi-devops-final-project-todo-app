import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

export const getTodos = () => 
    api.get('/todos');

export const createTodo = (title) =>
    api.post('/todos', { title })