
const jwt = require('jsonwebtoken');
const { secret } = require('../config/app').jwt;
const User = require('../models/user')
const { updateTokens, refreshTokens } = require('../helpers').authHelper;
const { registerValidate, loginValidate } = require('../helpers').validate;
const { createID } = require('../helpers').anotherHelper
const Token = require('../models/token');


//LOGIN
const singIn = async (req, res, next) => {
    const user = await loginValidate(req.body);
    if (user.error) return res.status(401).json(user);

    //Create token
    try {
        const tokens = await updateTokens(user.id);

        return res.status(200).json(tokens);
    } catch (err) { return res.status(500).json({ error: err.message }) };

};

//PASSWORD
const regIn = async (req, res) => {
    const condidate = await registerValidate(req.body);
    if (condidate.error) return res.status(401).json(condidate.error);

    //Create a new user
    const user = new User({
        _id: createID(),
        email: condidate.email,
        name: condidate.name,
        password: condidate.password
    });
    try {
        await user.save();
        return res.status(200).json({ message: 'User created!' })
    } catch (err) { return res.status(500).json({ error: err.message }) }
};

//REFRESH TOKEN
const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    let payload;
    try {
        payload = jwt.verify(refreshToken, secret);
        if (payload.type !== 'refresh') return res.status(400).json({ error: 'Invalid token!' });
        const tokenExit = await Token.findOne({ refreshToken: refreshToken });
        if (!tokenExit) return res.status(401).json({ error: 'Eror token1111!' });
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            return res.status(400).json({ error: 'Token expired!' });
        } else if (e instanceof jwt.JsonWebTokenError) {
            return res.status(400).json({ error: 'Invalid token!' });
        }
    }
    const result = await refreshTokens(payload.id);
    return res.status(200).json(result);
};

module.exports = {
    singIn, regIn, refreshToken
}