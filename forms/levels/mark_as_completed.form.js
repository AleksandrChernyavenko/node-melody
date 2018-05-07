'use strict';

const messages = require('../../config/messages');
const models = require('../../models/');

const paramsSchema = {
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

const paramsBody = {
    score: {
        isInt: {
            options: [{min: 1, max: 3}],
            errorMessage: messages.errors.onlyNumeric
        },
    },
};

exports.validate = function (req) {
    req.sanitizeParams('LevelId').toInt();
    req.checkParams(paramsSchema);
    req.sanitizeBody('score').toInt();
    req.checkBody(paramsBody);

    return req.asyncValidationErrors(true);
};

/**
 *
 * @param req
 * @returns {values}
 */
exports.mark = function (req) {

    const UserId = req.user.id;
    const LevelId = req.params.LevelId;
    const score = req.body.score;

    const params = {
        LevelId: LevelId,
        UserId: UserId,
    };

    let experience = 0;

    return models.LevelToUser
        .find({
            where: params
        })
        .then((level) => {
            if (level) {
                if (score > level.score) {
                    level.score = score;
                    experience = score * 10;
                    return level.save();
                }
            }
            else {
                params.score = score;
                experience = score * 10;
                return models.LevelToUser.create(params);
            }
        })
        .then(() => {
            if (experience) {
                return models.User.findByPrimary(UserId)
                    .then((user) => {
                        return user.addExperience(experience);
                    });
            }

        })
        .then(() => {
            return {experience};
        })
};
