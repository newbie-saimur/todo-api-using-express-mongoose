const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../schemas/userSchema');

const router = express.Router();
const User = mongoose.model('User', userSchema);

router.post('/signup', async (req, res) => {
    try {
        const newUser = new User({
            ...req.body,
            password: await bcrypt.hash(req.body.password, 10),
        });
        await newUser.save();
        res.status(201).json({ message: 'User was created successfully!' });
    } catch {
        res.status(500).json({ error: 'User can not be created!' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.find({ username });
    if (user && user.length > 0) {
        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if (isPasswordValid) {
            const data = {
                name: user[0].name,
                username: user[0].username,
                id: user[0]._id,
            };
            const accessToken = await jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '10h' });
            res.status(200).json({ message: 'Login Successful!', access_token: accessToken });
        } else {
            res.status(401).json({ error: 'Authentication failure!' });
        }
    } else {
        res.status(401).json({ error: 'Authentication failure!' });
    }
});

module.exports = router;
