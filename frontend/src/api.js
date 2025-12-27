import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

export const getTodos = () => 
    api.get(`/todos`);

export const createTodo = (title) =>
    api.post(`/todos`, { title });

export const updateTodo = (id, completed) =>
    api.put(`/todos/${id}`, { completed });

export const deleteTodo = (id) =>
    api.delete(`/todos/${id}`);