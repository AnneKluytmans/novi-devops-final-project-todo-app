import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api' || "http://localhost:3000/api",
});

export const getTodos = () => 
    api.get(`/todos`);

export const createTodo = (title) =>
    api.post(`/todos`, { title });

export const updateTodo = (id, completed) =>
    api.put(`/todos/${id}`, { completed });

export const deleteTodo = (id) =>
    api.delete(`/todos/${id}`);