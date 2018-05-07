'use strict';

/**
 *
 * @param sequelize
 * @param DataTypes
 * @returns {Model|*}
 */
module.exports = function (sequelize, DataTypes) {
    const LevelToUser = sequelize.define('LevelToUser', {

            LevelId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },

            UserId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },

            score: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
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

    return LevelToUser;
};
