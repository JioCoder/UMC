import React, { useState } from 'react';
import { TodoContext } from './context/TodoContext'; 
import './App.css';
import Input from './components/Input';
import Button from './components/Button';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 추가 로직
  };

  const addTodo = () => { 
    setTodos([...todos, { id: todos.length + 1, task: text }]); 
    setText('');
  };
  const deleteTodo = (id) => { 
    setTodos(todos.filter(todo => todo.id !== id)); 
  };
  const updateTodo = (id, newText) => { 
    setTodos(todos.map(todo => todo.id === id ? { ...todo, task: newText } : todo)); 
    setEditingId(null);
  };

  return (
    <TodoContext.Provider value={{ todos, setTodos, text, setText, editingId, setEditingId, editText, setEditText, handleSubmit, addTodo, deleteTodo, updateTodo }}>
      <div className="App">
        <form onSubmit={handleSubmit} className="todo-form">
          <Input value={text} onChange={(e) => setText(e.target.value)} />
          <Button onClick={addTodo} label="할 일" />
        </form>
        <div className="todo-list">
          {todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              {editingId !== todo.id ? (
                <>
                  <p>{todo.id}.</p>
                  <p>{todo.task}</p>
                </>
              ) : (
                <Input
                  defaultValue={todo.task}
                  onChange={(e) => setEditText(e.target.value)}
                />
              )}
              <div className="button-container">
                <Button onClick={() => deleteTodo(todo.id)} label="삭제" />
                {editingId === todo.id ? (
                  <Button onClick={() => updateTodo(editingId, editText)} label="수정 완료" />
                ) : (
                  <Button onClick={() => setEditingId(todo.id)} label="수정" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </TodoContext.Provider>
  );
}

export default App;
