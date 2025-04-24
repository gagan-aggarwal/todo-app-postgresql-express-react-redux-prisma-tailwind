const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Get all todos
router.get('/', async (req, res, next) => {
    try {
        const todos = await prisma.todo.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json(todos);
    } catch (error) {
        next(error);
    }
});

// Create a new todo
router.post('/', async (req, res, next) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const todo = await prisma.todo.create({
            data: { title },
        });
        res.status(201).json(todo);
    } catch (error) {
        next(error);
    }
});

// Update a todo
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;

        const todo = await prisma.todo.update({
            where: { id: parseInt(id) },
            data: { title, completed },
        });
        res.json(todo);
    } catch (error) {
        next(error);
    }
});

// Delete a todo
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma.todo.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

module.exports = router;