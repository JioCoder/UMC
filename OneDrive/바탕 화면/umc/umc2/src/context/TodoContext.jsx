import { createContext, useState } from 'react';

export const TodoContext = createContext();

export function TodoContextProvider({ children }) {
    const [todos, setTodos] = useState([
        {id : 1, task: '투두 만들기'},
        {id : 2, task: '현진 민서 지오'},
    ])
    
    const [text, setText] = useState('');
    const [editingId, setEditingId] = useState('');
    const [editText, setEditText] = useState('');
      
   
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    
      
    const addTodo = () => {
        setTodos((prev) => [
          ...prev,
          {id: Math.floor(Math.random() * 100) + 2, task: text},
        ])
        setText(''); //할 일 등록 후 초기화
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
        <TodoContext.Provider 
        value={{
        todos,
        setTodos, 
        text, 
        setText, 
        editingId, 
        setEditingId, 
        editText, 
        setEditText, 
        handleSubmit, 
        addTodo, 
        deleteTodo, 
        updateTodo,
    }}
    >
        {children}
        </TodoContext.Provider>
    );
}