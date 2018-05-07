'use strict';
const ValidationException = require('../components/errors').ValidationException;

module.exports = function (req, res, next) {

    if (req.validationErrors && typeof req.validationErrors === 'function') {
        const validationErrors = req.validationErrors;
        req.validationErrors = function (mapped, promisesResolved) {
            const errors = validationErrors(mapped, promisesResolved);
            if (errors !== false) {
                return new ValidationException(errors);
            }
            return errors;
        };
    }

    next();
};

