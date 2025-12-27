import { useEffect, useState } from 'react';
import {
  getTodos,
  createTodo,
  updateTodo,
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

  const handleToggleComplete = async (todo) => {
    await updateTodo(todo.id, !todo.completed);
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
      
      <ul className='todo-list'>
        {todos.map(t => (
          <li key={t.id} className={t.completed ? 'completed' : ''}>
            <label className='todo-item'>
              {t.title}
              <input
                type='checkbox'
                checked={t.completed}
                onChange={() => handleToggleComplete(t)}
              />
            </label>

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

