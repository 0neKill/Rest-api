const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./app/config');
const http = require('http');
const server = http.createServer(app);

config.express(app);
mongoose.Promise = global.Promise;

const { URL, PORT, Mongo } = config.app;

mongoose.connect(URL, Mongo)
    .then(() => app.listen(PORT, () => console.log(`Server connected in port: ${PORT}`)))
    .catch(() => console.log('MongoDB do not work!'));
    //app.listen(PORT, () => console.log(`Server connected in port: ${PORT}`))