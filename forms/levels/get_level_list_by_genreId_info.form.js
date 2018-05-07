'use strict';

const messages = require('../../config/messages');
const models = require('../../models/');

const schema = {
    GenreId: {
        isInt: {
            errorMessage: messages.errors.onlyNumeric
        },
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
exports.find = function (req) {
    const {GenreId} = req.params;
    const UserId = parseInt(req.user.id) || 0;

    const starSubQuery = `(SELECT SUM("LevelToUser"."score") FROM "LevelToUser" WHERE "LevelToUser"."LevelId" = "Level"."id" AND "LevelToUser"."UserId" = ${UserId})`;

    const conditions = {
        attributes: {
            include: [
                [models.sequelize.literal(starSubQuery), 'stars']
            ]
        },
        where: {
            GenreId: GenreId,
        },
        include: [
            {
                model: models.Song
            },
        ],
        order: [['id', 'ASC']]
    };

    return models.Level
        .findAll(conditions)
        .then((levels) => {
            return levels.map(level => level.getAsApiResponse());
        })

};