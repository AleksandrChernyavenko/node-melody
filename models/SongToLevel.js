'use strict';

/**
 *
 * @param sequelize
 * @param DataTypes
 * @returns {Model|*}
 */
module.exports = function (sequelize, DataTypes) {
    const SongToLevel = sequelize.define('SongToLevel', {

            SongId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },

            LevelId: {
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
                        'LevelId',
                        'createdAt',
                        'updatedAt'
                    ];
                },

            },
        });

    return SongToLevel;
};
