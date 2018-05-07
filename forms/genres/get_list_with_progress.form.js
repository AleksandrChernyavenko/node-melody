'use strict';
const models = require('../../models/');
const sequelize = models.sequelize;

exports.validate = function (req) {
    return req.asyncValidationErrors(true);
};

/**
 *
 * @param req
 * @returns {values}
 */
exports.find = function (req) {
    const UserId = req.user.id;
    const SQL = `
    
SELECT "Genre"."id",
       "Genre"."name",
       (    
            SELECT COUNT(*)
            FROM "Level"
            WHERE "Level"."GenreId"="Genre"."id"
        )  AS "levelCount",
       (
            SELECT COUNT(*)
            FROM "LevelToUser"
            INNER JOIN "Level" ON "Level"."GenreId" = "Genre"."id"
            WHERE "LevelToUser"."LevelId" = "Level"."id"  AND "LevelToUser"."UserId" = :UserId
        ) AS "doneLevelCount"
FROM "Genre" AS "Genre"
GROUP BY "Genre"."id"

`;

    return sequelize
        .query(SQL,
            {
                replacements: {UserId: UserId},
                type: sequelize.QueryTypes.SELECT,
                model: models.Genre
            }
        )
        .then((items) => {
            return items.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    levelCount: parseInt(item.getDataValue('levelCount')),
                    doneLevelCount: parseInt(item.getDataValue('doneLevelCount')),
                }
            })
        });
};