const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routeHandler/todoHandler');

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

app.use('/todo', todoHandler);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
