'use strict';

class AbstractEnum {

    constructor() {

        if (this.constructor === AbstractEnum) {
            throw new TypeError('Abstract class "AbstractEnum" cannot be instantiated directly.');
        }

        if (this.getValues === undefined) {
            throw new TypeError('Classes extending this abstract class must implement function "getValues" ');
        }

        if (this.getClientValues === undefined) {
            throw new TypeError('Classes extending this abstract class must implement function "getClientValues" ');
        }

    }

    getValue(key) {
        let values = this.getValues();
        return (key in values) ? values[key] : key;
    }

    /**
     *
     * @param key
     * @returns {*}
     */
    getClientValue(key) {
        let values = this.getClientValues();
        return (key in values) ? values[key] : key;
    }
}

module.exports = AbstractEnum;
