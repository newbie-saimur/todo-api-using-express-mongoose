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
    userId: {
        type: String,
        required: true,
    },
});

todoSchema.methods = {
    findCompleted: () => mongoose.model('Todo').find({ status: 'Completed' }),
    findPending: () => mongoose.model('Todo').find({ status: 'Pending' }),
    findInProgress: () => mongoose.model('Todo').find({ status: 'In Progress' }),
};

module.exports = todoSchema;
