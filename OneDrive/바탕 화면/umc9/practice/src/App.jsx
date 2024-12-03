import React from 'react';
import InputTodo from './components/InputTodo.js';
import TodoList from './components/TodoList.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>ToDo List</h1>
      <InputTodo />
      <TodoList />
    </div>
  );
}

export default App;
