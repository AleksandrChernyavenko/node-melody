'use strict';

const Sequelize = require('sequelize');
const db = {};
const fs = require('fs');
const path = require('path');
const dbConfig = require('../config/config').database;

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    dialect: dbConfig.dialect,
    logging: false,//console.print,
    define: {
        instanceMethods: {
            getAsApiResponse: function (attributes) {

                let relations = [];
                if (attributes === undefined) {
                    attributes = this.getApiAttributes ? this.getApiAttributes() : this.attributes;
                }

                if (this.$options && this.$options.include) {
                    relations = this.$options.include.map((relation) => {
                        return relation.as;
                    });
                }

                let response = {};

                attributes.map((attribute) => {
                    response[attribute] = this.get(attribute);
                });
                relations.map((relation) => {

                    if (this[relation]) {

                        if (Array.isArray(this[relation])) {
                            response[relation] = this[relation].map((item) => {
                                return item.getAsApiResponse ? item.getAsApiResponse() : item;
                            });
                        }
                        else {
                            if (this[relation].getAsApiResponse) {
                                response[relation] = this[relation].getAsApiResponse();
                            }
                            else {
                                response[relation] = this[relation];
                            }
                        }

                    }
                });

                return response;
            }
        }
    },
    pool: {
        max: 50,
        min: 10,
        idle: 10000
    }
});

fs.readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file !== 'enums');
    })
    .forEach((file) => {
        let model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;



module.exports = db;


function enableAutocomplete() {

    /**  @type {Model|User|*} */
    db.User = require('./User')();

    /**  @type {Model|Song|*} */
    db.Song = require('./Song')();

    /**  @type {Model|Variant|*} */
    db.Variant = require('./Variant')();

    /**  @type {Model|Genre|*} */
    db.Genre = require('./Genre')();

    /**  @type {Model|Level|*} */
    db.Level = require('./Level')();

    /**  @type {Model|LevelToUser|*} */
    db.LevelToUser = require('./LevelToUser')();

    /**  @type {Model|SongToLevel|*} */
    db.SongToLevel = require('./SongToLevel')();

    /**  @type {Model|SongToGenre|*} */
    db.SongToGenre = require('./SongToGenre')();

    throw new Error('this function for IDE autocomplete');
}
