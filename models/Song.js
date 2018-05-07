'use strict';
const config = require('../config/config');

/**
 *
 * @param sequelize
 * @param DataTypes
 * @returns {Model|*}
 */
module.exports = function (sequelize, DataTypes) {

    const Song = sequelize.define('Song',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: DataTypes.STRING,
            RightVariantId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    Song.hasMany(models.Variant);
                    Song.belongsToMany(models.Genre, {through: models.SongToGenre});
                    Song.belongsToMany(models.Level, {through: models.SongToLevel});
                },
            },
            instanceMethods: {
                getUrl() {
                    return `${config.fileStorageUrl}/${this.id}.mp3`;
                },
                getApiAttributes(){
                    return [
                        'id',
                        'name',
                        'RightVariantId',
                        'url',
                        'createdAt',
                        'updatedAt'
                    ];
                },
            },
            getterMethods: {
                url(){
                    return this.getUrl();
                },
            }
        }
    );
    return Song;
};
