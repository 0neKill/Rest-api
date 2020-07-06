const jwt = require('jsonwebtoken');
const { secret } = require('../config/app').jwt;
const Token = require('../models/token');

//Midlleware for check gametoken
module.exports = async (req, res, next) => {
    const authHeader = req.get('start-token');
    if (!authHeader) return res.status(401).json({ error: 'Token not provided!' });
    const token = authHeader.replace('Token ', '');
    try {
        const payload = jwt.verify(token, secret);
        if (payload.type !== 'start') return res.status(401).json({ error: 'Invalid token!' });
        const tokenExit = await Token.findOne({ gameToken: token });
        if (!tokenExit) return res.status(401).json({ error: 'Eror token!' });
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) return res.status(401).json({ error: 'Invalid expired!' });
        if (e instanceof jwt.JsonWebTokenError) return res.status(401).json({ error: 'Invalid token!' });
    }
    next();
};