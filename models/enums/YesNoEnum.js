'use strict';

const AbstractEnum = require('./AbstractEnum');

class YesNoEnum extends AbstractEnum {

    constructor() {
        super();

        this.YES = 0;
        this.NO = 1;
    }

    getValues() {
        let values = {};

        values[this.YES] = this.YES;
        values[this.NO] = this.NO;

        return values;
    }

    getClientValues() {
        let values = {};

        values[this.YES] = 'Yes';
        values[this.NO] = 'No';

        return values;
    }

}

/**
 * @property {function} getValue
 * @property {function} getClientValue
 */
const instance = new YesNoEnum();
module.exports = instance;

