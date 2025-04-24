import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
} from './todosAPI';

const initialState = {
    items: [],
    status: 'idle',
    error: null,
};

export const loadTodos = createAsyncThunk('todos/loadTodos', async () => {
    return await fetchTodos();
});

export const createTodo = createAsyncThunk('todos/createTodo', async (title) => {
    return await addTodo(title);
});

export const toggleTodo = createAsyncThunk('todos/toggleTodo', async (todo) => {
    return await updateTodo({
        ...todo,
        completed: !todo.completed,
    });
});

export const removeTodo = createAsyncThunk('todos/removeTodo', async (id) => {
    await deleteTodo(id);
    return id;
});

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(loadTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })
            .addCase(toggleTodo.fulfilled, (state, action) => {
                const index = state.items.findIndex(todo => todo.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(removeTodo.fulfilled, (state, action) => {
                state.items = state.items.filter(todo => todo.id !== action.payload);
            });
    },
});

export default todosSlice.reducer;

export const selectTodos = (state) => state.todos.items;
export const selectTodosStatus = (state) => state.todos.status;
export const selectTodosError = (state) => state.todos.error;