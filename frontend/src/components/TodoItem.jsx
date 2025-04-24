import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, removeTodo, editTodo } from '../features/todos/todosSlice';
import { motion } from 'framer-motion';
import "./todo.css"
const TodoItem = ({ todo }) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState(todo.title);

    useEffect(() => {
        setTitle(todo.title);
    }, [todo.title]);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleToggle = () => {
        dispatch(toggleTodo(todo));
    };

    const handleDelete = () => {
        dispatch(removeTodo(todo.id));
    };

    const handleEdit = () => {
        dispatch(editTodo({ ...todo, title }));
        closeModal();
    }

    return (<>
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
            <div>

                <button
                    onClick={openModal}
                    className="p-1 text-blue-500 rounded-full hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                    </svg>
                </button>
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

            </div>
        </motion.li>

        {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn">
                {/* Modal Container */}
                <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6 relative transform transition-all duration-300 animate-scaleIn">
                    {/* Close Button (Top Right) */}
                    <button
                        onClick={closeModal}
                        className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-lg hover:scale-110 transition-transform duration-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-gray-500 hover:text-gray-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    {/* Modal Header */}
                    <div className="flex  items-center mb-5">
                        <h3 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                            Update Todo
                        </h3>
                    </div>

                    {/* Modal Content */}
                    <div className="mb-6 text-gray-600">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />

                    </div>

                    {/* Modal Footer */}
                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={closeModal}
                            className="px-5 py-2.5 text-gray-600 hover:text-gray-800 font-medium rounded-lg hover:bg-gray-100 transition-all duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleEdit}
                            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
    );
};

export default TodoItem;