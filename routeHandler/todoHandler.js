/* eslint-disable comma-dangle */
const express = require('express');
const mongoose = require('mongoose');
const checkLogin = require('../middlewares/checkLogin');
const todoSchema = require('../schemas/todoSchema');

const router = express.Router();
const Todo = mongoose.model('Todo', todoSchema);

// Get all TODOs
router.get('/', checkLogin, async (req, res) => {
    try {
        const savedTodos = await Todo.find({ userId: req.userId })
            .select({ __v: 0, userId: 0 })
            .limit(5);
        const message = savedTodos.length >= 0 ? 'Success' : 'There was no saved todo!';
        res.status(201).json({ message, data: savedTodos });
    } catch (err) {
        res.status(500).json({ message: 'There was an error!' });
    }
});

// Get only completed TODOs
router.get('/completed', checkLogin, async (req, res) => {
    try {
        const todo = new Todo();
        const data = await todo.findCompleted().select({ __v: 0, userId: 0 }).limit(5);
        res.status(201).json({ message: 'Success', data });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Get only pending TODOs
router.get('/pending', checkLogin, async (req, res) => {
    try {
        const todo = new Todo();
        const data = await todo.findPending().select({ __v: 0, userId: 0 }).limit(5);
        res.status(201).json({ message: 'Success', data });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Get only in progress TODOs
router.get('/in-progress', checkLogin, async (req, res) => {
    try {
        const todo = new Todo();
        const data = await todo.findInProgress().select({ __v: 0, userId: 0 }).limit(5);
        res.status(201).json({ message: 'Success', data });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Get a TODO by ID
router.get('/:id', checkLogin, async (req, res) => {
    try {
        const savedTodo = await Todo.find({ _id: req.params.id }).select({
            __v: 0,
            userId: 0,
        });
        res.status(201).json({ message: 'Success', data: savedTodo });
    } catch (err) {
        res.status(500).json({ message: 'There was an error!' });
    }
});

// Post a TODO
router.post('/', checkLogin, async (req, res) => {
    try {
        const newTodo = new Todo({ ...req.body, userId: req.userId });
        const savedTodo = await newTodo.save();
        const { __v, userId, ...todoData } = savedTodo.toObject();
        res.status(201).json({ message: 'Todo was inserted successfully!', data: todoData });
    } catch (err) {
        res.status(500).json({ message: 'There was an error!' });
    }
});

// Post multiple TODOs
router.post('/bulk', checkLogin, async (req, res) => {
    try {
        const savedTodos = await Todo.insertMany(
            req.body.map((todo) => ({ ...todo, userId: req.userId }))
        );
        const todos = savedTodos
            .map((todo) => todo.toObject())
            .map(({ __v, userId, ...todo }) => todo);
        res.status(201).json({ message: 'Todos were inserted successfully!', data: todos });
    } catch (err) {
        res.status(500).json({ message: 'There was an error!' });
    }
});

// Update a TODO by ID
router.put('/:id', checkLogin, async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }).select({ __v: 0, userId: 0 });
        res.status(201).json({ message: 'Todo was updated successfully!', data: updatedTodo });
    } catch (err) {
        res.status(500).json({ message: 'There was an error!' });
    }
});

// Delete a TODO by ID
router.delete('/:id', checkLogin, async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id).select({
            __v: 0,
            userId: 0,
        });
        res.status(201).json({ message: 'Todo was deleted successfully!', data: deletedTodo });
    } catch (err) {
        res.status(500).json({ message: 'There was an error!' });
    }
});

module.exports = router;
