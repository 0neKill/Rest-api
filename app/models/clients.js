const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    title: {
        type: String,
        min: 3,
        max: 255,
        required: true
    },
    version: {
        type: String,
        min: 3,
        max: 10,
        required: true
    },
    discription: {
        type: String,
        min: 3,
        max: 255,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Client', clientSchema);