import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTodo } from '../features/todos/todosSlice';
import { motion } from 'framer-motion';

const TodoForm = () => {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            dispatch(createTodo(title));
            setTitle('');
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
        >
            <div className="flex items-center">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add a new todo..."
                    className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
                <button
                    type="submit"
                    className="px-4 py-3 text-white bg-green-500 rounded-r-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                >
                    Add
                </button>
            </div>
        </motion.form>
    );
};

export default TodoForm;