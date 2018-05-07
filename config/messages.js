'use strict';

const messages = {
    errors: {
        'wrongValue': 'Unacceptable value.',
        wrongValueOfParam: (fieldName) => {
            return `${fieldName} has an unacceptable value.`;
        },
        'wrongId': 'Wrong id',
        'duplicateError': 'Duplicate entity',
        'wrongEmailFormat': 'Your e-mail should contain *@mobidev.biz or *@mobidev.com.ua.',
        'emailNotExist': 'This e-mail is not registered.',
        'wrongDateValue': 'Incorrect date value.',
        'wrongDateFormatValue': 'Incorrect date format. It should be YYYY/MM/DD',
        'tooLongOrShortString': 'Text length should be from 1 to 255 symbols.',
        'tooLongOrShortText': 'Text length should be from 1 to 1 500 symbols.',
        wrongLengthOfString: (min = 1, max = 255) => `Text length should be from ${min} to ${max} symbols.`,
        'onlyLatinCharacters': 'It\'s possible to use only Latin.',
        'onlyCyrillicCharacters': 'It\'s possible to use only Cyrillic.',
        'onlyNumeric': 'Allow only numeric',
        onlyInteger: (min = false, max = false) => {
            let message = 'Allow only numeric.';
            if (min) {
                message += ` Minimum value must be greater then ${min}.`;
            }
            if (max) {
                message += ` Maximum value must be less then ${max}.`;
            }
            return message;
        },
        'required': 'Required field.',
        notEmpty: (fieldName) => {
            return `${fieldName} can't be empty.`;
        },
        'userNotFound': 'Users in db have wrong hierarchical structure or `seoId` is wrong.',
        superiorNotFound: (id) => {
            return `Some user have superiorId=${id}, but user with id doesn\'t exist.`;
        },
    },
    rdwlErrors:{
        maxOccupation:'This employee has already reached maximum weekly workload. Please contact Head of R&D Department for clarification.',
        wrongWorkTime: `"StartWorkTime" can't be more then "endWorkTime"`,
        canNotDeleteOvertime: `Can't delete overtime because it was spent`,
        canNotDeleteActivePM: `Can't delete active PM`,
    },
    vacationStatistic: {
        maxVacationDays: 'You cannot add days. Amount of All available vacation days reached maximum value'
    }
};
module.exports = messages;
