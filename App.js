import React, { useState } from 'react';
import './App.css';

function Todo({ todo, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState(todo.taskName);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const handleUpdate = () => {
    onUpdate(todo.id, editedTaskName, editedDescription);
    setEditing(false);
  };

  return (
    <div className="todo-card">
      {!editing ? (
        <>
          <h3>{todo.taskName}</h3>
          <p>{todo.description}</p>
          <p>Status: {todo.status}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={editedTaskName}
            onChange={(e) => setEditedTaskName(e.target.value)}
          />
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
        </>
      )}
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [newTaskName, setNewTaskName] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const addTodo = () => {
    if (newTaskName.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        taskName: newTaskName,
        description: newDescription,
        status: 'not completed',
      };
      setTodos([...todos, newTodo]);
      setNewTaskName('');
      setNewDescription('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, updatedTaskName, updatedDescription) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, taskName: updatedTaskName, description: updatedDescription }
          : todo
      )
    );
  };

  const handleStatusChange = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: todo.status === 'completed' ? 'not completed' : 'completed' } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') {
      return todo.status === 'completed';
    } else if (filter === 'not completed') {
      return todo.status === 'not completed';
    } else {
      return true;
    }
  });

  return (
    <div className="App">
      <h1>Todo App</h1>
      <input
        type="text"
        placeholder="Enter Task Name"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Description"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="not completed">Not Completed</option>
      </select>
      <div className="todo-list">
        {filteredTodos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
