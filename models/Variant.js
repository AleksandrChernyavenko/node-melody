'use strict';

/**
 *
 * @param sequelize
 * @param DataTypes
 * @returns {Model|*}
 */
module.exports = function (sequelize, DataTypes) {

    const Variant = sequelize.define('Variant',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: DataTypes.STRING,
            SongId: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                    Variant.belongsTo(models.Song);
                },
            },
        }
    );
    return Variant;
};
