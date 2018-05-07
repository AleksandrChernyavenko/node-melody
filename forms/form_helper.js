'use strict';

const ValidationException = require('../components/errors').ValidationException;
const helper = {};

module.exports = helper;


/**
 *
 * @param {string} order
 * @param {Array} allowedAttributes
 * @param {object=} additionalSortFieldsMap
 * @returns {*}
 */
helper.getOrder = function (order, allowedAttributes, additionalSortFieldsMap) {

    if (order && order.query) {
        order = order.query.order;
    }

    if (!order) {
        return [];
    }
    var direction = 'DESC';

    if (order.indexOf('-') === 0) {
        order = order.substring(1);
        direction = 'ASC';
    }

    if (allowedAttributes.indexOf(order) === -1) {
        return [];
    }
    else {
        if (additionalSortFieldsMap && additionalSortFieldsMap.hasOwnProperty(order)) {

            if (Array.isArray(additionalSortFieldsMap[order])) { // [[{model: models.User, as: 'author'}, 'fieldName', 'direction']];
                let sort = additionalSortFieldsMap[order].slice(0);// "clone" the array
                sort.push(direction);
                return [sort];
            }
            return [[additionalSortFieldsMap[order], order, direction]]; // [[ ProfileModel, fieldName, directionName]]
        }
        return [[order, direction]];
    }
};

/**
 *
 * @param req
 * @returns {Number|number}
 */
helper.getPage = function (req) {
    return parseInt(req.query.page) || 1;
};

/**
 *
 * @param req
 * @returns {Number|number}
 */
helper.getPageSize = function (req) {
    return parseInt(req.query.limit) || 10;
};

/**
 *
 * @param val
 * @returns {Number|null}
 */
helper.getOptionalFieldValue = function (val) {
    return (val !== undefined) ? val : null;
};

/**
 *
 * models.User.findAndCountAll(conditions).then(formHelper.formatOutput);
 *
 * @param {Object} [result]
 * @param {Object} [result.rows]
 * @param {Object} [result.count]
 * @returns {{count, rows: (Array|*|{})}}
 */
helper.formatOutput = function (result) {
    return {
        count: result.count,
        rows: result.rows.map((model) => model.getAsApiResponse())
    };
};


/**
 *
 * models.User.findAndCountAll(conditions).then(formHelper.formatOutput);
 *
 * @param {Object} [req]
 * @param {Object} [req.query]
 * @param {Object} [req.body]
 * @param {Object} [req.params]
 *
 * @param {Object} [conditions]
 * @returns {{count, rows: (Array|*|{})}}
 */
helper.injectPaginateConditions = function (req, conditions = {}) {

    const page = helper.getPage(req);
    const pageSize = helper.getPageSize(req);

    conditions.offset = pageSize * (page - 1);
    conditions.limit = pageSize;

    return conditions;
};


/**
 *
 * @param startDate
 * @param endDate
 * @param formatter
 * @returns {Array}
 */
helper.getDatesRange = function (startDate, endDate, formatter) {

    if (!formatter) {
        formatter = function (date) {
            return new Date(date).toISOString().slice(0, 10);
        };
    }


    startDate = new Date(startDate);
    endDate = new Date(endDate);

    if (startDate > endDate) {
        throw new ValidationException('Start date must be more than End date');
    }

    let addDays = function (date, count) {
        let dat = new Date(date);
        dat.setUTCDate(dat.getUTCDate() + count);
        return dat;
    };


    let dateArray = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
        dateArray.push(currentDate);
        currentDate = addDays(currentDate, 1);
    }

    return dateArray.map(formatter);
};


/**
 *
 * @param date
 * @returns {number}
 */
helper.getWeekNumber = function (date) {
    const instance = new Date(date);
    const target = new Date(instance.valueOf());
    const dayNr = (instance.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);

    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000);
};

/**
 * return Monday from inputDate
 * @param inputDate
 * @returns {*}
 */
helper.toFirstDayOfWeek = function (inputDate) {
    const date = new Date(inputDate);

    if (date.getDay() === 1) {
        return date.toISOString().slice(0, 10);
    }

    if (date.getDay() === 0) { //Sun
        date.setDate(date.getDate() - 6);
        return date.toISOString().slice(0, 10);
    }

    while (date.getDay() !== 1) {
        date.setDate(date.getDate() - 1);
    }

    return date.toISOString().slice(0, 10);
};

/**
 * return closest Sunday
 * @param inputDate
 * @returns {string}
 */
helper.toLastDayOfWeek = function (inputDate) {
    const date = new Date(inputDate);
    while (date.getDay() !== 0) {
        date.setDate(date.getDate() + 1);
    }

    return date.toISOString().slice(0, 10);
};

