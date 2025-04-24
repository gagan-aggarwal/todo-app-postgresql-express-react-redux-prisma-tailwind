const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllTodos = async (req, res, next) => {
    try {
        const todos = await prisma.todo.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json({ success: true, data: todos });
    } catch (error) {
        next(error);
    }
};

const createTodo = async (req, res, next) => {
    try {
        const { title } = req.body;

        if (!title || typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Title is required'
            });
        }

        const todo = await prisma.todo.create({
            data: { title: title.trim() },
        });
        res.status(201).json({ success: true, data: todo });
    } catch (error) {
        next(error);
    }
};

const updateTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                success: false,
                message: 'Valid ID is required'
            });
        }

        const updateData = {};
        if (title) updateData.title = title.trim();
        if (completed !== undefined) updateData.completed = completed;

        const todo = await prisma.todo.update({
            where: { id: parseInt(id) },
            data: updateData,
        });
        res.json({ success: true, data: todo });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            });
        }
        next(error);
    }
};

const deleteTodo = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                success: false,
                message: 'Valid ID is required'
            });
        }

        await prisma.todo.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).end();
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            });
        }
        next(error);
    }
};

module.exports = {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo
};