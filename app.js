const express = require('express');
const config = require('./config/config');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportVerify = require('./components/passportVerify');
const models = require('./models');
const expressValidator = require('./middlewares/expressValidator');
const apiExpressValidator = require('./middlewares/api_express_validator');
const apiErrorHandler = require('./middlewares/api_error_handler');
const app = express();
const SequelizeStore = require('connect-session-sequelize')(expressSession.Store);
const includeRoutes = require('./routes');

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', 'https://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(expressSession({
    secret: config.sessionSecret,
    store: new SequelizeStore({
        db: models.sequelize
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
    },
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    models.User.findByPrimary(id)
        .then(function (user) {
            done(null, user);
        });
});

passport.use(new LocalStrategy(
    {
        usernameField: 'viewer_id',
        passwordField: 'api_id',
        passReqToCallback: true
    },
    passportVerify
));

app.use(expressValidator);

app.get('/ping', function (req, res) {
    res.send('pong')
});

// app.all('/api/*', (req,res,next) => setTimeout(() => next(), 5000));

app.all('/api/*', apiExpressValidator);
includeRoutes(app);
app.use('/api', apiErrorHandler);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        err
    });
});

module.exports = app;