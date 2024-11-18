import React, { useState } from 'react';
import './App.css'
import Input from './components/Input';
import Button from './components/Button';

function App() { 
  const [todos, setTodos] = useState([ // 할 일 목록을 배열로 관리
    {id : 1, task: '투두 리스트 과제'},
    {id : 2, task: '자료 구조'},
  ])

  const [text, setText] = useState(''); // 입력 텍스트 관리
  const [editingId, setEditingId] = useState(''); // 할 일의 id 관리
  const [editText, setEditText] = useState(''); // 수정한 텍스트 관리


  const handleSubmit = (e) => { // 새로고침 방지
    e.preventDefault();
  };

  
  const addTodo = () => { // 새로운 할 일 추가
    setTodos((prev) => [
      ...prev,
      {id: Math.floor(Math.random() * 100) + 2, task: text},
    ])
    setText(''); 
  };

  //삭제
  const deleteTodo = (id) => { // 
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
        <Input value={text} onChange={(e) => setText(e.target.value)} />  // 사용자 입력
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