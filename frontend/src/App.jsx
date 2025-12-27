import { useEffect, useState } from 'react';
import {
  getTodos,
  createTodo,
  deleteTodo
} from './api';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const fetchTodos = () => {
    getTodos().then(res => setTodos(res.data));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    await createTodo(newTodo);
    setNewTodo('');
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  return (
    <div className='container'>
      <h1>Todo App</h1>

      <form onSubmit={handleAddTodo} className='todo-form'>
        <input
          type='text'
          placeholder='New todo...'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type='submit'>Add</button>
      </form>
      
      <ul>
        {todos.map(t => (
          <li key={t.id}>
            {t.title}
            {t.completed && ' ✅'}

            <button onClick={() => handleDelete(t.id)}>
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

