import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import { selectTodos, selectTodosStatus, selectTodosError } from '../features/todos/todosSlice';

const TodoList = () => {
    const todos = useSelector(selectTodos);
    const status = useSelector(selectTodosStatus);
    const error = useSelector(selectTodosError);

    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    if (status === 'failed') {
        return <div className="text-red-500 text-center p-4">Error: {error}</div>;
    }

    return (
        <ul className="space-y-2">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    );
};

export default TodoList;