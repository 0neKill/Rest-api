const fs = require('fs');
const path = require('path')
const { createID } = require('./anotherHelper');
const User = require('../models/user');

//Create code for power client 
const argumentsCreate = async (data) => {
    const accessToken = createID();
    await User.findOneAndUpdate({ _id: data.user.uuid }, { $set: { accessToken: accessToken } });
    let date = fs.readFileSync(path.join(__dirname, '..', '..', 'clients', 'startArgument', `${data.client}.yml`), 'UTF-8');
    const result = date.replace('%NAME%', data.user.name).
        replace('%UUID%', data.user.uuid).
        replace('%ACCESSTOKEN%', accessToken);
    return result
};

module.exports = {
    argumentsCreate,
}