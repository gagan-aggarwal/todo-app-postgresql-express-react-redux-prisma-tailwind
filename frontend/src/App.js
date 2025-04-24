import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { loadTodos } from './features/todos/todosSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Todo App</h1>
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
}

export default App;