'use strict';

const messages = require('../../config/messages');
const models = require('../../models/');

const schema = {

    SongId: {
        isInt: {
            errorMessage: messages.errors.onlyNumeric
        },
        isValueExistInTable: {
            options: ['Song', 'id'],
            errorMessage: messages.errors.wrongId
        }
    },

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
    req.sanitizeBody('SongId').toInt();
    req.sanitizeBody('GenreId').toInt();
    req.checkBody(schema);

    return req.asyncValidationErrors(true);
};

/**
 *
 * @param req
 * @returns {values}
 */
exports.addOneGenre = function (req) {

    const {SongId, GenreId} = req.body;

    return Promise
        .all([
            models.Song.findByPrimary(SongId),
            models.Genre.findByPrimary(GenreId),
        ])
        .then((items) => {
            const [song, genre] = items;
            return song.hasGenre(genre)
                .then((alreadyHasGenre) => {
                    if (!alreadyHasGenre) {
                        return song.addGenre(genre);
                    }
                });
        });


};
