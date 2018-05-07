'use strict';

const messages = require('../../config/messages');
const models = require('../../models/');

const schema = {

    name: {
        isLength: {
            options: [1, 255],
            errorMessage: messages.errors.tooLongOrShortString
        },
    },

    rightVariant: {
        isInt: {
            errorMessage: messages.errors.onlyNumeric
        },
    },

    variant1: {
        isLength: {
            options: [1, 255],
            errorMessage: messages.errors.tooLongOrShortString
        },
    },

    variant2: {
        isLength: {
            options: [1, 255],
            errorMessage: messages.errors.tooLongOrShortString
        },
    },

    variant3: {
        isLength: {
            options: [1, 255],
            errorMessage: messages.errors.tooLongOrShortString
        },
    },

    variant4: {
        isLength: {
            options: [1, 255],
            errorMessage: messages.errors.tooLongOrShortString
        },
    },

};

exports.validate = function (req) {
    req.checkBody(schema);
    req.sanitizeBody('rightVariant').toInt();

    return req.asyncValidationErrors(true);
};

/**
 *
 * @param req
 * @returns {values}
 */
exports.create = function (req) {


    const {name, rightVariant, variant1, variant2, variant3, variant4} = req.body;

    const values = {
        name
    };


    return models.Song
        .create({name})
        .then((song) => {

            return Promise
                .all([
                    createVariant(variant1, song.id),
                    createVariant(variant2, song.id),
                    createVariant(variant3, song.id),
                    createVariant(variant4, song.id),
                ])
                .then((variants) => {
                    const variant = variants[rightVariant-1];
                    song.RightVariantId = variant.id;
                    return song.save();
                })
        });
};


function createVariant(name, SongId) {
    return models.Variant.create({name, SongId})
}
