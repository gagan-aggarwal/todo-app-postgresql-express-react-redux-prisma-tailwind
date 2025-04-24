import axios from 'axios';

const API_URL = 'http://localhost:5000/todos';

export const fetchTodos = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addTodo = async (title) => {
    const response = await axios.post(API_URL, { title });
    return response.data;
};

export const updateTodo = async (todo) => {
    const response = await axios.put(`${API_URL}/${todo.id}`, todo);
    return response.data;
};

export const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
};