'use strict';

module.exports.getLevelExperience = function (level) {
    let exp = 100;
    let defaultModifier = 1.05;
    for (let i = 1; i < level; i++) {
        let modifier = defaultModifier;
        if (i > 20) {
            modifier = 1 + (defaultModifier / i);
        }
        exp = Math.round(exp * modifier);

    }
    return exp;
};