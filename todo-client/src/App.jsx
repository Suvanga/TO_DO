import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "https://to-do-suvanga.onrender.com/";


function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    axios.get(API_URL).then(res => setTasks(res.data));
  }, []);

  const addTask = async () => {
    if (!input.trim()) return;
    const newTask = { task: input, isCompleted: false };
    const res = await axios.post(API_URL, newTask);
    setTasks([...tasks, res.data]);
    setInput('');
  };

  const toggleTask = async (task) => {
    await axios.put(`${API_URL}/${task.id}`, {
      ...task,
      isCompleted: !task.isCompleted,
    });
    setTasks(tasks.map(t => t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div style={{ background: 'linear-gradient(to bottom, black, white)', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Floating Quotes */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '20%',
        fontSize: '24px',
        color: 'white',
        opacity: 0.5,
        animation: 'float 6s infinite'
      }}>
        You can do it
      </div>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '60%',
        fontSize: '24px',
        color: 'white',
        opacity: 0.5,
        animation: 'float 8s infinite'
      }}>
        You are Perfect
      </div>
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '40%',
        fontSize: '24px',
        color: 'white',
        opacity: 0.5,
        animation: 'float 7s infinite'
      }}>
        Keep Going
      </div>
      <div style={{
        position: 'absolute',
        top: '70%',
        left: '10%',
        fontSize: '24px',
        color: 'white',
        opacity: 0.5,
        animation: 'float 9s infinite'
      }}>
        Believe in Yourself
      </div>
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '80%',
        fontSize: '24px',
        color: 'white',
        opacity: 0.5,
        animation: 'float 10s infinite'
      }}>
        Stay Positive
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: 500,
        margin: '40px auto',
        fontFamily: 'Arial',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        position: 'relative',
        zIndex: 1
      }}>
        <h1>Suvanga's To-Do List</h1>
        <input
          type="text"
          value={input}
          placeholder="Enter task"
          onChange={(e) => setInput(e.target.value)}
          style={{ padding: '8px', width: '70%' }}
        />
        <button onClick={addTask} style={{ padding: '8px' }}>Add</button>
        <ul>
          {tasks.map(task => (
            <li key={task.id} style={{ margin: '10px 0' }}>
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => toggleTask(task)}
              />
              <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none', marginLeft: '8px' }}>
                {task.task}
              </span>
              <button onClick={() => deleteTask(task.id)} style={{ marginLeft: '10px' }}>❌</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Floating Animation */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

export default App;
