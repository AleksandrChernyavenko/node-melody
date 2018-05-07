'use strict';

const messages = require('../../config/messages');
const models = require('../../models/');
const ValidationException = require('../../components/errors').ValidationException;

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

    SongId: {
        isInt: {
            errorMessage: messages.errors.onlyNumeric
        },
        isValueExistInTable: {
            options: ['Song', 'id'],
            errorMessage: messages.errors.wrongId
        }
    },


};

exports.validate = function (req) {
    req.sanitizeBody('LevelId').toInt();
    req.sanitizeBody('SongId').toInt();
    req.checkBody(schema);

    return req.asyncValidationErrors(true);
};

/**
 *
 * @param req
 * @returns {values}
 */
exports.addOneSong = function (req) {

    const {LevelId, SongId} = req.body;

    return Promise
        .all([
            models.Level.findByPrimary(LevelId),
            models.Song.findByPrimary(SongId),
        ])
        .then((items) => {
            const [level, song] = items;
            return level.hasSong(song)
                .then((alreadyHasSong) => {
                    if (!alreadyHasSong) {
                        return level.addSong(song);
                    }
                    throw new ValidationException('Duplicate song');
                });
        });


};
