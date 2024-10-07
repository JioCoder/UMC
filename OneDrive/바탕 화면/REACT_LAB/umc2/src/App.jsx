import React, { useState } from 'react';
import './App.css'
import Input from './components/Input';
import Button from './components/Button';

function App() { 
  const [todos, setTodos] = useState([
    {id : 1, task: '투두 리스트 과제'},
    {id : 2, task: '자료 구조'},
  ])

  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState('');
  const [editText, setEditText] = useState('');

  //렌더링 방지
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //추가
  const addTodo = () => {
    setTodos((prev) => [
      ...prev,
      {id: Math.floor(Math.random() * 100) + 2, task: text},
    ])
    setText(''); 
  };

  //삭제
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) =>item.id !== id))
  }

  //수정
  const updateTodo = (id, text) => {
    if (text.trim() !== '') {
      setTodos((prev) =>
        prev.map((item) => (item.id === id ? {...item, task:text}:item))
      );
      setEditingId('');
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="todo-form">
        <Input value={text} onChange={(e) => setText(e.target.value)} />
        <Button onClick={addTodo} label="할 일 등록" />
      </form>
      <div className = "todo-list">
        {todos.map((todo, _) => (
          <div key={todo.id} className ="todo-item">
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
    </>
  );
}

export default App;