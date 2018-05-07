'use strict';
const config = require('../config/config/index');

/**
 *
 * @param sequelize
 * @param DataTypes
 * @returns {Model|*}
 */
module.exports = function (sequelize, DataTypes) {

    const Genre = sequelize.define('Genre',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    Genre.belongsToMany(models.Song, {through: 'SongToGenre'});
                    Genre.hasMany(models.Level);
                },
            },
            instanceMethods: {
                getUrl() {
                    return `${config.fileStorageUrl}/images/genre/${this.id}.jpg`;
                },
                getApiAttributes(){
                    return [
                        'id',
                        'name',
                        'url',
                        'countOfLevels',
                        'createdAt',
                        'updatedAt'
                    ];
                },
            },
            getterMethods: {
                url(){
                    return this.getUrl();
                },
                countOfLevels(){
                    return parseInt(this.getDataValue('countOfLevels')) || 0;
                },
            }

        }
    );
    return Genre;
};
