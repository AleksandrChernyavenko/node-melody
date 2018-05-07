'use strict';

const level_calc = require('../components/level_calc');

/**
 *
 * @param sequelize
 * @param DataTypes
 * @returns {Model|*}
 */
module.exports = function (sequelize, DataTypes) {

    const User = sequelize.define('User',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            vkId: {
                type: DataTypes.INTEGER,
                unique: true,
                allowNull: false,
            },
            vkAccessToken: {
                type: DataTypes.STRING,
            },
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            level: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
                allowNull: false,
            },
            experience: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false,
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        },
        {
            freezeTableName: true,
            classMethods: {
                associate: function (models) {
                },
            },
            instanceMethods: {
                addExperience(experience) {
                    const maxCurrentLevelExp = level_calc.getLevelExperience(this.level);
                    const expectedExperience = this.experience + experience;
                    if (maxCurrentLevelExp >= expectedExperience) {
                        this.experience = expectedExperience;
                    }
                    else {
                        this.level++;
                        this.experience = expectedExperience - maxCurrentLevelExp;
                    }
                    return this.save();
                }
            }
        }
    );
    return User;
};
