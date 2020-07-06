const body = require('body-parser');
const route = require('../routers');
const middleware = require('../middleware');
module.exports = (app) => {
    app.use(body.urlencoded({ extended: false }));
    app.use(body.json());


    app.use('/', route.web);
    app.use('/api', route.api);
    app.use(middleware.PAGE_NOT_FOUND);
};