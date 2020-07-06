const auth = require('./api/auth')
const sessions = require('./api/sessions');
const home = require('./web/home');
const dates = require('./api/dates');

module.exports = {
    api: [auth, sessions, dates],
    web: [home,]
}