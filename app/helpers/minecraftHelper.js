const User = require('../models/user');
const base_64 = require('base-64');

//When client request
const joinValidate = async (data) => {
    const { accessToken, selectedProfile, serverId } = data;
    if (accessToken == null || selectedProfile == null || serverId == null) {
        return {
            error: {
                error: '403',
                errorMessage: 'Ошибка авторизации,перезайдите в игру',
                cause: '[Пустые данные]'
            }
        };
    };
    const user = await User.findOne({ _id: selectedProfile });
    const accessExist = accessToken === user.accessToken;
    if (!user) {
        return {
            error: {
                error: '403',
                errorMessage: 'Такого пользователя нет,зарегистрируйтесь',
                cause: '[Нет такого пользователя]'
            }
        };
    }
    if (!accessExist) {
        return {
            error: {
                error: '403',
                errorMessage: 'Сессия удалена,перезайдите и игру через лаунчер',
                cause: '[Нет сессии]'
            }
        };
    };
    if (user.ban == true) {
        return {
            error: {
                error: '403',
                errorMessage: 'Вы забанены',
                cause: '[Бан]'
            }
        };
    }
    await User.findOneAndUpdate({ _id: selectedProfile }, { $set: { serverId: serverId } });
    return {
        OK: { OK: 'OK' },
        accessToken: accessToken,
        selectedProfile: selectedProfile,
        serverId: serverId
    };
};

//When server request
const hasJoinedValidate = async (data) => {
    const { username, serverId } = data;
    const user = await User.findOne({
        name: username,
        serverId: serverId
    });
    if (!user) {
        return {
            error: {
                error: '403',
                errorMessage: 'Такого пользователя нет,зарегистрируйтесь',
                cause: '[Нет такого пользователя]'
            }
        };
    };
    const base64 = {
        timestamp: Date.now,
        profileId: user._id,
        profileName: user.name,
        textures: {
            SKIN: {
                url: 'https://tlauncher.org/upload/all/skins/skin_20160622030212146579.png'
            }
        }
    };
    return {
        id: user._id,
        name: user.name,
        properties: [
            {
                name: 'textures',
                value: base_64.encode(base64)
            }
        ]
    };
};

module.exports = {
    joinValidate, hasJoinedValidate
}