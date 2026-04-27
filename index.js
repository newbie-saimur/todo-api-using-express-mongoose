const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const todoHandler = require('./routeHandler/todoHandler');
const userHandler = require('./routeHandler/userHandler');

const app = express();
app.use(express.json());

// Database Connection
mongoose
    .connect('mongodb://localhost/todos')
    .then(() => {
        console.log('MongoDB Connection Successful!');
    })
    .catch((err) => {
        console.log(err);
    });

const errorHandler = (err, req, res, next) => {
    if (res.headerSent) {
        return next(err);
    }
    return res.status(500).json({ error: err });
};

app.use('/todo', todoHandler);
app.use('/user', userHandler);
app.use(errorHandler);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
