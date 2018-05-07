'use strict';

const TABLES = [
    'Level',
    'SongToLevel',
    'LevelToUser',
];

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface
            .createTable('Level', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                GenreId: {
                    type: Sequelize.INTEGER,
                    references: 'Genre',
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
            })
            .then(() => {
                return queryInterface
                    .createTable('SongToLevel', {

                        SongId: {
                            type: Sequelize.INTEGER,
                            references: 'Song',
                            referencesKey: 'id',
                            onUpdate: 'CASCADE',
                            onDelete: 'CASCADE',
                            allowNull: false,
                            primaryKey: true
                        },

                        LevelId: {
                            type: Sequelize.INTEGER,
                            references: 'Level',
                            referencesKey: 'id',
                            onUpdate: 'CASCADE',
                            onDelete: 'CASCADE',
                            allowNull: false,
                            primaryKey: true
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
                return queryInterface
                    .createTable('LevelToUser', {

                        LevelId: {
                            type: Sequelize.INTEGER,
                            references: 'Level',
                            referencesKey: 'id',
                            onUpdate: 'CASCADE',
                            onDelete: 'CASCADE',
                            allowNull: false,
                            primaryKey: true
                        },

                        UserId: {
                            type: Sequelize.INTEGER,
                            references: 'User',
                            referencesKey: 'id',
                            onUpdate: 'CASCADE',
                            onDelete: 'CASCADE',
                            allowNull: false,
                            primaryKey: true
                        },

                        score: {
                            type: Sequelize.INTEGER,
                            allowNull: false,
                            defaultValue: 1,
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
    },
    down: function (queryInterface, Sequelize) {
        return Promise.all(TABLES.map((TABLE_NAME) => queryInterface.dropTable(TABLE_NAME)));
    }
};
