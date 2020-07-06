const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    tokenId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    gameToken: {
        type: String,
        default: ''
    },

});

module.exports = mongoose.model('Token', tokenSchema)