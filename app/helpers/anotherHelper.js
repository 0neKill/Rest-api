const uuid = require('uuid/v4')
const md5 = require('md5');

//Create id 
const createID = () => md5(uuid());

//Delay
const delay = ms => {
    return new Promise(r => setTimeout(() => r(), ms));
}


module.exports = {
    createID, delay
};