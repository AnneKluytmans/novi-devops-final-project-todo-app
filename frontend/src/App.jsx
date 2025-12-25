import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('/api/todos').then(res => setTodos(res.data));
  }, []);

  return (
    <div className="container">
      <h1>Todo App</h1>

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

