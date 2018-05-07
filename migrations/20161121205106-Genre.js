'use strict';

const TABLE_NAME = 'Genre';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface
            .createTable(TABLE_NAME, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                name: {
                    allowNull: false,
                    type: Sequelize.STRING,
                    unique: true
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
                return queryInterface.bulkInsert(TABLE_NAME, [
                    {
                        name: 'Все',
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                    {
                        name: 'Современные',
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                    {
                        name: 'Русские',
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                    {
                        name: 'Зарубежные',
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                    {
                        name: 'Музыка из фильмов',
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                    {
                        name: 'Детские песни',
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                    {
                        name: 'Песни на которых выросли',
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                ]);
            })
            .then(() => {
                return queryInterface
                    .createTable('SongToGenre', {

                        SongId: {
                            type: Sequelize.INTEGER,
                            references: 'Song',
                            referencesKey: 'id',
                            onUpdate: 'CASCADE',
                            onDelete: 'CASCADE',
                            allowNull: false,
                            primaryKey: true
                        },

                        GenreId: {
                            type: Sequelize.INTEGER,
                            references: 'Genre',
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
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable(TABLE_NAME)
            .then(() => queryInterface.dropTable('SongToGenre'))
    }
};
