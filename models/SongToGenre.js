'use strict';

/**
 *
 * @param sequelize
 * @param DataTypes
 * @returns {Model|*}
 */
module.exports = function (sequelize, DataTypes) {
    const SongToGenre = sequelize.define('SongToGenre', {

            SongId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },

            GenreId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },

            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                }
            },
            instanceMethods:{
                getApiAttributes(){
                    return [
                        'SongId',
                        'GenreId',
                        'createdAt',
                        'updatedAt'
                    ];
                },

            },
        });

    return SongToGenre;
};
