'use strict';

const messages = require('../../config/messages');
const models = require('../../models/');

const schema = {
    LevelId: {
        isInt: {
            errorMessage: messages.errors.onlyNumeric
        },
        isValueExistInTable: {
            options: ['Level', 'id'],
            errorMessage: messages.errors.wrongId
        }
    },
};

exports.validate = function (req) {
    req.sanitizeParams('LevelId').toInt();
    req.checkParams(schema);
    return req.asyncValidationErrors(true);
};

/**
 *
 * @param req
 * @returns {values}
 */
exports.find = function (req) {
    const {LevelId} = req.params;

    const params = {
        include: [
            {
                model: models.Song,
                order: [['id', 'ASC']],
                include: [
                    {
                        model: models.Variant,
                    }
                ],
            }
        ],
    };

    return models.Level
        .findByPrimary(LevelId, params)
        .then((level) => {
            return level.getAsApiResponse();
        })

};