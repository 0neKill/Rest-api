const { secret, tokens } = require('../config/app').jwt;
const jwt = require('jsonwebtoken');
const { createID } = require('./anotherHelper');
const Token = require('../models/token');


//Generate GameToken
const genersteGameToken = (userId) => {
    const payload = {
        userId: userId,
        type: tokens.start.type
    };
    const options = { expiresIn: tokens.start.expiresIn };
    return jwt.sign(payload, secret, options);
};
//Generate AccessToken
const genersteAccessToken = (userId) => {
    const payload = {
        userId,
        type: tokens.access.type
    };
    const options = { expiresIn: tokens.access.expiresIn };
    return jwt.sign(payload, secret, options);
};
//Generate RefreshToken
const genersteRefreshToken = () => {
    const payload = {
        id: createID(),
        type: tokens.refresh.type
    }
    const options = { expiresIn: tokens.refresh.expiresIn };
    return {
        id: payload.id,
        token: jwt.sign(payload, secret, options)
    };
};
//Write tokens in database
const replaceDbRefreshToken = (tokenId, userId, accessToken, refreshToken) => {
    return Token.findOneAndRemove({ userId })
        .exec()
        .then(() => Token.create({ tokenId, userId, accessToken, refreshToken }))
};
//Update tokens(Refresh and Access)
const updateTokens = (userId) => {
    const accessToken = genersteAccessToken(userId);
    const refreshToken = genersteRefreshToken();
    return replaceDbRefreshToken(refreshToken.id, userId, String(accessToken), String(refreshToken.token))
        .then(() => ({
            accessToken,
            refreshToken: refreshToken.token
        }));
};
//Update GameToken
const updateGameToken = async (userId) => {
    const gameToken = genersteGameToken(userId);
    await Token.findOneAndUpdate({ userId: userId }, { $set: { gameToken: gameToken } });
    return gameToken;
};
//Update all tokens
const refreshTokens = async (payload) => {
    const token = await Token.findOne({ tokenId: payload });
    if (token === null) {
        throw new Error('Invalid token!');
    }
    const tokens = await updateTokens(token.userId);
    const gameToken = await updateGameToken(token.userId);
    const result = {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        gameToken: gameToken
    }
    return result;
};

module.exports = {
    genersteAccessToken,
    genersteRefreshToken,
    genersteGameToken,
    replaceDbRefreshToken,
    refreshTokens,
    updateTokens,
    updateGameToken,
};