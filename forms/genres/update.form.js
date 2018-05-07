'use strict';

const messages = require('../../config/messages');
const models = require('../../models/');
const onlyNumericError = require('../../config/messages').errors.onlyNumeric;


const schemaParams = {
    id: {
        isInt: {
            errorMessage: onlyNumericError
        },
        isValueExistInTable: {
            options: ['Genre', 'id'],
            errorMessage: messages.errors.wrongId
        }
    }
};

const schemaBody = (req) => {
    const extraConditions = {id: {$ne: req.params.id}};
    return {
        name: {
            isLength: {
                options: [1, 255],
                errorMessage: messages.errors.tooLongOrShortString
            },
            isUniqueValue: {
                options: ['Genre', 'name', extraConditions],
                errorMessage: messages.errors.duplicateError
            }
        }
    }
};

exports.validate = function (req) {

    req.sanitizeParams('id').toInt();

    req.checkParams(schemaParams);
    req.checkBody(schemaBody(req));

    return req.asyncValidationErrors(true);
};

exports.update = function (req) {

    let name = req.body.name;
    let id = req.params.id;

    return models.Genre
        .findByPrimary(id)
        .then((direction) => {
            direction.name = name;
            return direction.save({authUser: req.user});
        });
};

