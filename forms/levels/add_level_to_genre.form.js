'use strict';

const messages = require('../../config/messages');
const models = require('../../models/');
const schema = {


    GenreId: {
        isInt: {
            errorMessage: messages.errors.onlyNumeric
        },
        isValueExistInTable: {
            options: ['Genre', 'id'],
            errorMessage: messages.errors.wrongId
        }
    },


};

exports.validate = function (req) {
    req.sanitizeParams('GenreId').toInt();
    req.checkParams(schema);

    return req.asyncValidationErrors(true);
};

/**
 *
 * @param req
 * @returns {values}
 */
exports.addOneLevel = function (req) {
    const {GenreId} = req.params;
    return models.Level.create({GenreId});
};
