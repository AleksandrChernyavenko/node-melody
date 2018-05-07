'use strict';

const tableName = 'User';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable(tableName, {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            vkId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                unique: true
            },
            vkAccessToken: {
                type: Sequelize.STRING,
            },
            firstName: {
                type: Sequelize.STRING
            },
            lastName: {
                type: Sequelize.TEXT
            },
            isAdmin: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable(tableName);
    }
};