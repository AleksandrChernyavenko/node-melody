'use strict';

const messages = require('../../config/messages');
const models = require('../../models/');


const schemaParams = {
    id: {
        isInt: {
            errorMessage: messages.errors.onlyNumeric
        },
        isValueExistInTable: {
            options: ['Song', 'id'],
            errorMessage: messages.errors.wrongId
        }
    }
};


const schema = {

    name: {
        optional: true,
        isLength: {
            options: [1, 255],
            errorMessage: messages.errors.tooLongOrShortString
        },
    },

    RightVariantId: {
        optional: true,
        isInt: {
            errorMessage: messages.errors.onlyNumeric
        },
        isValueExistInTable: {
            options: ['Variant', 'id'],
            errorMessage: messages.errors.duplicateError
        }
    },


};

exports.validate = function (req) {

    req.checkParams(schemaParams);
    req.checkBody(schema);

    req.sanitizeBody('RightVariantId').toInt();

    return req.asyncValidationErrors(true);
};

/**
 *
 * @param req
 * @returns {Promise.<Object>|Promise|*}
 */
exports.update = function (req) {

    const body = req.body;
    const id = req.params.id;

    return models.Song
        .findByPrimary(id)
        .then((model) => {

            Object.keys(schema).forEach((attrName) => {
                let attrValue = body[attrName];
                if (attrValue !== undefined) {
                    model[attrName] = attrValue;
                }
            });

            return model.save();
        });

};

