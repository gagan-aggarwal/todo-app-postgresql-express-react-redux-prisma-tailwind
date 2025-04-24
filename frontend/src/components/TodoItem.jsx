import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, removeTodo } from '../features/todos/todosSlice';
import { motion } from 'framer-motion';

const TodoItem = ({ todo }) => {
    const dispatch = useDispatch();

    const handleToggle = () => {
        dispatch(toggleTodo(todo));
    };

    const handleDelete = () => {
        dispatch(removeTodo(todo.id));
    };

    return (
        <motion.li
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center justify-between p-4 mb-2 rounded-lg shadow ${todo.completed ? 'bg-green-50' : 'bg-white'
                }`}
        >
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={handleToggle}
                    className="w-5 h-5 text-green-500 rounded focus:ring-green-400"
                />
                <span
                    className={`ml-3 text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
                        }`}
                >
                    {todo.title}
                </span>
            </div>
            <button
                onClick={handleDelete}
                className="p-1 text-red-500 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                </svg>
            </button>
        </motion.li>
    );
};

export default TodoItem;