import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTodos = () => {
    axios.get('/api/todos').then(res => setTodos(res.data));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title) return;

    await axios.post('/api/todos', { title });
    setTitle('');
    fetchTodos();
  };

  return (
    <div className="container">
      <h1>Todo App</h1>

      <div className="add-todo">
        <input
          type="text"
          placeholder="New todo..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      
      <ul>
        {todos.map(t => (
          <li key={t.id}>
            {t.title}
            {t.completed && ' ✅'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

