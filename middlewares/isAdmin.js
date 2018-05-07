const ForbiddenHttpException = require('../components/errors').ForbiddenHttpException;

module.exports = function isAdmin(req, res, next) {

    if (req.isAuthenticated() && req.user && req.user.isAdmin) {
        return next();
    }

    return next( new ForbiddenHttpException());
};