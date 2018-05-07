'use strict';

const messages = require('../../config/messages');
const models = require('../../models/');

const formHelper = require('../form_helper');

const schema = {
    id: {
        optional: true,
        isInt: {
            errorMessage: messages.errors.onlyNumeric
        },
    },
    name: {
        optional: true,
        isLength: {
            options: [1, 255],
            errorMessage: messages.errors.tooLongOrShortString
        },
    },
    page: {
        optional: true,
        isInt: {
            errorMessage: messages.errors.onlyNumeric
        }
    },
    limit: {
        optional: true,
        isNumeric: {
            errorMessage: messages.errors.onlyNumeric
        },
        isInt: {
            options: [{min: 0, max: 1000}],
            errorMessage: 'Must be between 0 and 1000'
        }
    },
};

exports.validate = function (req) {
    req.checkQuery(schema);
    return req.asyncValidationErrors(true);
};

/**
 *
 * @param req
 * @returns {values}
 */
exports.find = function (req) {
    const {id, name} = req.query;

    const whereConditions = {};
    const conditions = {
        where: whereConditions,
    };

    if (id) {
        whereConditions.id = id;
    }

    if (name) {
        whereConditions.name = {$iLike: '%' + name + '%'};
    }


    //pagination
    formHelper.injectPaginateConditions(req, conditions);

    return models.User
        .findAndCountAll(conditions)
        .then(formHelper.formatOutput)

};