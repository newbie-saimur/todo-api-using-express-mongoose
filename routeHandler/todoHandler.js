const express = require('express');
const mongoose = require('mongoose');
const todoSchema = require('../schemas/todoSchema');

const router = express.Router();
const Todo = mongoose.model('Todo', todoSchema);

// Get all TODOs
router.get('/', async (req, res) => {
    try {
        const savedTodos = await Todo.find().limit(5);
        const message = savedTodos.length >= 0 ? 'Success' : 'There was no saved todo!';
        res.status(201).json({ message, data: savedTodos });
    } catch (err) {
        res.status(500).json({ message: 'There was an error!' });
    }
});

// Get only completed TODOs
router.get('/completed', async (req, res) => {
    try {
        const todo = new Todo();
        const data = await todo.findCompleted().limit(5);
        res.status(201).json({ message: 'Success', data });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Get only pending TODOs
router.get('/pending', async (req, res) => {
    try {
        const todo = new Todo();
        const data = await todo.findPending().limit(5);
        res.status(201).json({ message: 'Success', data });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Get only in progress TODOs
router.get('/in-progress', async (req, res) => {
    try {
        const todo = new Todo();
        const data = await todo.findInProgress().limit(5);
        res.status(201).json({ message: 'Success', data });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Get a TODO by ID
router.get('/:id', async (req, res) => {
    try {
        const savedTodo = await Todo.find({ _id: req.params.id });
        res.status(201).json({ message: 'Success', data: savedTodo });
    } catch (err) {
        res.status(500).json({ message: 'There was an error!' });
    }
});

// Post a TODO
router.post('/', async (req, res) => {
    try {
        const newTodo = new Todo(req.body);
        const savedTodo = await newTodo.save();
        res.status(201).json({ message: 'Todo was inserted successfully!', data: savedTodo });
    } catch (err) {
        res.status(500).json({ message: 'There was an error!' });
    }
});

// Post multiple TODOs
router.post('/bulk', async (req, res) => {
    try {
        const savedTodos = await Todo.insertMany(req.body);
        res.status(201).json({ message: 'Todos were inserted successfully!', data: savedTodos });
    } catch (err) {
        res.status(500).json({ message: 'There was an error!' });
    }
});

// Update a TODO by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json({ message: 'Todo was updated successfully!', data: updatedTodo });
    } catch (err) {
        res.status(500).json({ message: 'There was an error!' });
    }
});

// Delete a TODO by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: 'Todo was deleted successfully!', data: deletedTodo });
    } catch (err) {
        res.status(500).json({ message: 'There was an error!' });
    }
});

module.exports = router;
