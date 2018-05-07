'use strict';
const passportSocketIo = require('passport.socketio');
const passport = require('passport');
const expressSession = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(expressSession.Store);
const models = require('../../models/');
const config = require('../../config/config');
const cookieParser = require('cookie-parser');


module.exports = function (io) {

    io.use(passportSocketIo.authorize({
        store: new SequelizeStore({
            db: models.sequelize
        }),
        secret: config.sessionSecret,
        passport: passport,
        cookieParser: cookieParser
    }));


};


