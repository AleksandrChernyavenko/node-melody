'use strict';

const messages = require('../../config/messages');
const models = require('../../models/');

const schema = {
    name: {
        isLength: {
            options: [1, 255],
            errorMessage: messages.errors.tooLongOrShortString
        },
        isUniqueValue: {
            options: ['Genre', 'name'],
            errorMessage: messages.errors.duplicateError
        }
    }
};

exports.validate = function (req) {
    req.checkBody(schema);
    return req.asyncValidationErrors(true);
};

/**
 *
 * @param req
 * @returns Promise|*
 */
exports.create = function (req) {
    const values = {
        name: req.body.name
    };
    return models.Genre
        .create(values, {authUser: req.user})
        .then((item) => {
            return models.Genre.findByPrimary(item.id);
        })
        .then((item) => {
            return item.getAsApiResponse();
        });
};
