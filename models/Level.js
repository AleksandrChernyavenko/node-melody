'use strict';
/**
 *
 * @param sequelize
 * @param DataTypes
 * @returns {Model|*}
 */
module.exports = function (sequelize, DataTypes) {

    const Level = sequelize.define('Level',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            GenreId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    Level.belongsTo(models.Genre);
                    Level.hasMany(models.LevelToUser);
                    Level.belongsToMany(models.Song, {through: models.SongToLevel});
                },
            },
            instanceMethods: {
                getApiAttributes(){
                    return [
                        'id',
                        'GenreId',
                        'stars',
                        'createdAt',
                        'updatedAt'
                    ];
                },
            },
            getterMethods: {
                stars(){
                    return parseInt(this.getDataValue('stars')) || 0;
                }
            },


        }
    );
    return Level;
};
