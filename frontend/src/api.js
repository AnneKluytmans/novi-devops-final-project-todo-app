import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getTodos = () => 
    api.get(`/api/todos`);

export const createTodo = (title) =>
    api.post(`/api/todos`, { title });

export const updateTodo = (id, completed) =>
    api.put(`/api/todos/${id}`, { completed });

export const deleteTodo = (id) =>
    api.delete(`api/todos/${id}`);