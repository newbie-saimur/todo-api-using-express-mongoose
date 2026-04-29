const jwt = require('jsonwebtoken');

const checkLogin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const { username, name, id } = decoded;
        req.username = username;
        req.name = name;
        req.userId = id;
        next();
    } catch {
        next('Authentication failure!');
    }
};

module.exports = checkLogin;
