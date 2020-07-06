const { delay } = require('../helpers').anotherHelper
const User = require('../models/user');
const { joinValidate, hasJoinedValidate } = require('../helpers').minecraftHelper;




//Client request
const joinClient = async (req, res) => {
    try {
        const result = await joinValidate(req.body);
        if (result.error) return res.status(403).json(result);
        const { accessToken, selectedProfile, serverId, OK } = result;
        res.status(200).json(OK);
        delay(10000)
            .then(() => User.findOneAndUpdate({ _id: selectedProfile },
                { $unset: { serverId: serverId, accessToken: accessToken } }))
    } catch (e) {
        return (res.status(403).json({
            error: '403',
            errorMessage: 'Неизвестная ошибка,перезайдите в лаунчер',
            cause: '[Неизвестная ошибка]'
        }), console.log(e));
    }
};

//Server request
const joinedServer = async (req, res) => {
    try {
        const result = await hasJoinedValidate(req.query);
        if (result.error) return res.status(403).json(result);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(403).json({
            error: '403',
            errorMessage: 'Неизвестная ошибка,перезайдите в лаунчер',
            cause: '[Неизвестная ошибка]'
        });
    };
}

module.exports = {
    joinClient,
    joinedServer
}