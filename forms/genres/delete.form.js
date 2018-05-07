'use strict';

const messages = require('../../config/messages');
const models = require('../../models/');

let schema = {
    id: {
        isInt: {
            errorMessage: messages.errors.onlyNumeric
        },
        isValueExistInTable: {
            options: ['Genre', 'id'],
            errorMessage: messages.errors.wrongId
        }
    }
};


/**
 *
 * @param req
 * @returns {Promise.<Promise>}
 */
exports.validate = function (req) {
    req.sanitizeParams('id').toInt();
    req.checkParams(schema);
    return req.asyncValidationErrors(true);
};

/**
 *
 * @param req
 * @returns {Promise.<Promise>}
 */
exports.delete = function (req) {
    return models.Genre
        .findByPrimary(req.params.id)
        .then((item) => {
            return item.destroy({authUser: req.user});
        });
};
