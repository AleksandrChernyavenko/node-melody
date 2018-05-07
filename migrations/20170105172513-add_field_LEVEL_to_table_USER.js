'use strict';

const TABLE_NAME = 'User';

const COLUMN1 = 'level';
const COLUMN2 = 'experience';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn(
            TABLE_NAME,
            COLUMN1,
            {
                type: Sequelize.INTEGER,
                defaultValue:1,
                allowNull: false,
            }
        ).then(() => {
            return queryInterface.addColumn(
                TABLE_NAME,
                COLUMN2,
                {
                    type: Sequelize.INTEGER,
                    defaultValue:0,
                    allowNull: false,
                }
            );
        })
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn(TABLE_NAME, COLUMN1).then(() => {
            return queryInterface.removeColumn(TABLE_NAME, COLUMN2);
        });
    }
};
