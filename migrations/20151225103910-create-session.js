'use strict';

const tableName = 'Sessions';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable(tableName, {
            sid: {
                type: Sequelize.STRING(32),
                primaryKey: true
            },
            expires: Sequelize.DATE,
            data: Sequelize.TEXT,
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