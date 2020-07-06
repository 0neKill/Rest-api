const { authHelper, validate, fileHelper } = require('../helpers');

const Clients = require('../models/clients');

//Check user in database with token
const userData = async (req, res) => {
    const user = await validate.loginValidate(req.body);
    if (user.error) return res.status(401).json(user);
    const token = await authHelper.updateTokens(user.id);
    const gameToken = await authHelper.updateGameToken(user.id);
    const clients = await Clients.find().select('title version discription');
    const data = {
        clientId: user.id,
        name: user.name,
        gameToken: gameToken,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        _id: clients[0]._id,
        title: clients[0].title,
        version: clients[0].version,
        discription: clients[0].discription

    };
    return res.status(200).json(data);
};

//When user bush the button game 
const gameDate = async (req, res) => {
    const date = {
        clientId: req.body.clientId,
        userId: req.body.id,
        userName: req.body.name
    }
    const gameAccept = await validate.startGameValidate(date);
    if (gameAccept.error) return res.status(401).json(gameAccept);
    const result = await fileHelper.argumentsCreate(gameAccept);
    return res.status(200).json({ result: result });
};



module.exports = {
    gameDate, userData
}