'use strict';
const expressValidator = require('express-validator');
const validator = require('express-validator').validator;
const models = require('../models/');
const dateFormat = /^([0-9]{4})-([0-9]{2})-[0-9]{2}$/; // date '2016-11-06'

module.exports = expressValidator({
    customValidators: {
        uniqueEmail: function (email) {
            return new Promise(function (resolve, reject) {
                models.User.findOne({
                    where: {
                        email: email
                    }
                }).then((user) => {
                    if (user) {
                        return reject(user);
                    }
                    resolve();
                }).catch(() => reject());
            });
        },



        /**
         * example usage:
         *
         *  isValueExistInTable: {
         *      options: ['User', 'id'],
         *      errorMessage: messages.errors.wrongId
         *   }
         *
         * @param value
         * @returns {Promise}
         */
        isValueExistInTable: function (value) { //can validate array of values
            let arrayValues = Array.from(arguments).slice(1);
            let tableName = arrayValues[0];
            let fieldName = arrayValues[1];

            let values = Array.isArray(value) ? value : [value];

            return new Promise(function (resolve, reject) {

                Promise
                    .all(values.map((value) => {
                        if (typeof value === 'number' && isNaN(value)) {
                            return Promise.reject();
                        }
                        let obj = {};
                        obj.where = {};
                        obj.where[fieldName] = value;
                        return models[tableName].findOne(obj);
                    }))
                    .then((records) => {
                        if (records.every((item) => !!item)) {
                            return resolve(true);
                        }
                        reject();
                    })
                    .catch(() => reject());

            });
        },

        isUniqueValue: function (value) { // TODO:check array validation  ( like function "isValueExistInTable" )
            let arrayValues = Array.from(arguments).slice(1);
            let tableName = arrayValues[0];
            let fieldName = arrayValues[1];
            let additionConditions = arrayValues[2] || {};
            let obj = {};
            obj.where = additionConditions;
            obj.where[fieldName] = value;
            return new Promise(function (resolve, reject) {

                if (typeof value === 'number' && isNaN(value)) {
                    return reject();
                }

                models[tableName].findOne(obj)
                    .then((item) => {
                        if (item) {
                            return reject(item);
                        }
                        return resolve();
                    })
                    .catch(() => reject());
            });
        },


        /**
         * example usage:
         *
         *    inArray: {
         *       options: allowedSortAttributes,
         *       errorMessage: 'wrong sort param'
         *   }
         *
         * @param value
         * @returns {*}
         */
        inArray: function (value) {
            let arrayValues = Array.from(arguments).slice(1);
            return inArray(value, arrayValues, false);
        },
        inMobidevEmail: function (value) {
            value = String(value);
            return value.endsWith('@mobidev.biz') || value.endsWith('@mobidev.com.ua');
        },
        /**
         * example usage:
         *
         *     typeId: {
         *        inEnumObject: {
         *            options: [WorkScheduleEnum.getValues()],
         *            errorMessage: messages.errors.wrongValue
         *        },
         *     },
         * @param value
         * @param obj
         * @returns {boolean|*}
         */
        inEnumObject: function (value, obj) {
            return obj.hasOwnProperty(value);
        },
        isValidResetPasswordToken: function (value) {
            return new Promise((resolve, reject) => {
                models.User.findOne({where: {resetPasswordToken: value}})
                    .then((user) => {

                        if (!user) {
                            return reject();
                        }

                        if (user.resetPasswordExpires < Date.now()) {
                            return reject();
                        }

                        return resolve();
                    })
                    .catch(() => reject());
            });
        },
        isSecurePassword: function (pass) {
            //            lower                && upper                &&  digit             && special           && minlength
            let isValid = pass.match(/[a-z]/g) && pass.match(/[A-Z]/g) && pass.match(/\d/g) && pass.match(/\W/g) && pass.length >= 10;
            return !!isValid;
        },


        /**
         * validators to array
         */

        /**
         * [0,2] in [0,1,2,3] - correct
         * example usage:
         *
         *  type: {
         *       optional: true,
         *       eachContainIn: {
         *           options: Object.keys(GeneralLogTypeEnum.getValues()),
         *           errorMessage: messages.errors.onlyNumeric
         *       }
         *   }
         *
         * @param values
         * @returns {*}
         */
        eachContainIn: function (values) {
            let arrayValues = Array.from(arguments).slice(1);

            if (!Array.isArray(values)) {
                return false;
            }

            return values.every(elem => {
                return arrayValues.indexOf(elem) !== -1;
            });
        },

        isValidDatesArray: function (values) {

            if (!Array.isArray(values)) {
                return false;
            }
            return values.every((item) => {
                return validator.isDate(item) && validator.matches(item, dateFormat);
            });
        },
        isDivisible: function (value, divider) {
            return value % divider === 0;
        },

        /**
         * example usage:
         *   year: {
         *       eachIsInt: {
         *           options: [{min: 2000, max: 2100}],
         *           errorMessage: messages.errors.onlyInteger(2000, 2100)
         *       },
         *   },
         * @param weeks
         * @param options
         * @returns {boolean}
         */
        isValidRdwlWeeksArray: function (weeks, options = {}) {

            if (!Array.isArray(weeks)) {
                return false;
            }

            // options: [{min: 2000, max: 2100}],
            // options: [{min: 0, max: 54}],


            return weeks.every((week) => {

                if (!week.hasOwnProperty('weekNumber') || !week.hasOwnProperty('year')) {
                    return false;
                }

                return validator.isInt(week.weekNumber, {min: 1, max: 53})
                    && validator.isInt(week.year, {min: 2000, max: 2100});
            });
        },

        isArrayOfEmails: (emails) => {

            if (!Array.isArray(emails)) {
                return false;
            }

            return emails.every((email) => {
                return validator.isEmail(email);
            });
        }
    }
});


function inArray(needle, haystack, strict) {
    let found = false, key;
    strict = !!strict;

    for (key in haystack) {
        if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
            found = true;
            break;
        }
    }

    return found;
}



