const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Complete'],
        default: 'Pending',
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = todoSchema;
