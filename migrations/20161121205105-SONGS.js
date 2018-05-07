'use strict';


module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface
            .createTable('Song', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                name: {
                    allowNull: false,
                    type: Sequelize.STRING
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                }
            })
            .then(() => {
                return queryInterface
                    .createTable('Variant', {

                        id: {
                            allowNull: false,
                            autoIncrement: true,
                            primaryKey: true,
                            type: Sequelize.INTEGER
                        },

                        name: {
                            allowNull: false,
                            type: Sequelize.STRING
                        },

                        SongId: {
                            type: Sequelize.INTEGER,
                            references: 'Song',
                            referencesKey: 'id',
                            onUpdate: 'CASCADE',
                            onDelete: 'CASCADE',
                            allowNull: false,
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
            })
            .then(() => {
                return queryInterface.addColumn('Song', 'RightVariantId', {
                    allowNull: true,
                    type: Sequelize.INTEGER,
                    references: 'Variant',
                    referencesKey: 'id',
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                });
            })
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface
            .dropTable('Song')
            .then(() => queryInterface.dropTable('Variant'));
    }
};
