const UnauthorizedException = require('../components/errors').UnauthorizedException;

module.exports = function (req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    }
    return next(new UnauthorizedException());
};