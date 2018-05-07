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
    PmId: {
        optional: true,
        isValueExistInTable: {
            options: ['User', 'id'],
            errorMessage: messages.errors.wrongId
        }
    },
    GenreId: {
        optional: true,
        isValueExistInTable: {
            options: ['Genre', 'id'],
            errorMessage: messages.errors.wrongId
        }
    },
    exceptIds: {
        optional: true,
        isValueExistInTable: {
            options: ['Song', 'id'],
            errorMessage: messages.errors.wrongId
        }
    },
    onlyUnused: {
        optional: true,
        isBoolean: {
            errorMessage: messages.errors.wrongId
        }
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
    const {id, name, GenreId, clientName, PmId, statusId, typeId, exceptIds, onlyUnused, random} = req.query;

    const whereConditions = {};
    const conditions = {where: whereConditions};
    const genreWhere = {};
    const genreThroughConditions = {};

    if (exceptIds) {
        whereConditions.id = {
            $notIn: exceptIds
        };
    }

    if (id) {
        whereConditions.id = id;
    }

    if (onlyUnused) {
        whereConditions.id = {
            $notIn: [models.sequelize.literal('SELECT  "SongToLevel"."SongId" FROM "SongToLevel" WHERE  "SongToLevel"."SongId" =  "Song"."id"')]
        };
    }

    if (name) {
        whereConditions.name = {$iLike: '%' + name + '%'};
    }

    if (clientName) {
        whereConditions.clientName = {$iLike: '%' + clientName + '%'};
    }

    if (PmId) {
        whereConditions.PmId = PmId;
    }

    if (statusId) {
        whereConditions.statusId = statusId;
    }

    if (typeId) {
        whereConditions.typeId = typeId;
    }

    if (GenreId) {
        genreWhere.id = GenreId;
        genreThroughConditions.GenreId = GenreId;
    }

    conditions.order = [['id', 'DESC']];

    if(random) {
        conditions.order = [models.Sequelize.fn( 'RANDOM' )];
    }

    conditions.distinct = true;
    conditions.include = [
        {
            model: models.Variant,
            required: false,
        },
        {

            model: models.Genre,
            where: genreWhere,
            required: !!GenreId,
            through: { //this need for fix bug in Sequelize.query-generator - throughWhere
                where: genreThroughConditions
            },
        },
    ];
    // conditions.logging = console.print;


    //pagination
    formHelper.injectPaginateConditions(req, conditions);

    return models.Song
        .findAndCountAll(conditions)
        .then(formHelper.formatOutput)

};