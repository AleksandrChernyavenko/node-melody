'use strict';

const messages = require('../../config/messages');
const multiparty = require('multiparty');
const mime = require('mime');
const config = require('../../config/config');
const path = require('path');
const fs = require('fs');
const ValidationException = require('../../components/errors').ValidationException;


const schema = {
    id: {
        isInt: {
            errorMessage: messages.errors.onlyNumeric
        },
        isValueExistInTable: {
            options: ['Song', 'id'],
            errorMessage: messages.errors.wrongId
        }
    }
};

/**
 *
 * @param req
 * @returns {Promise|Object}
 */
module.exports.validateUserId = function (req) {

    req.sanitizeParams('id').toInt();
    req.checkParams(schema);

    return req.asyncValidationErrors(true);
};

/**
 * @param req
 * @param inputName
 * @returns {Promise}
 */
module.exports.getUploadedFile = function (req, inputName) {

    return new Promise((resolve, reject) => {
        const form = new multiparty.Form();

        form.parse(req, function (err, fields, files) {
            if (err || !files[inputName]) {
                return reject(err);
            }

            let file = files[inputName].shift();
            resolve(file);
        });
    });
};


const IMAGE_TYPES = ['audio/mpeg'];

module.exports.validateFile = function (file) {
    const type = mime.lookup(file.path);
    return new Promise((resolve, reject) => {

        if (IMAGE_TYPES.indexOf(type) === -1) {
            reject(new ValidationException('Supported image formats: mp3.'));
        }
        resolve(file);
    });
};

module.exports.saveFile = function (file, songId) {

    const fileExtension = file.path.split(/[. ]+/).pop(); // '.mp3'
    const newFileNamePath = path.join(config.fileStoragePath, `${songId}.${fileExtension}`); // /var/www/storage/1.mp3

    return new Promise((resolve, reject) => {
        fs.rename(file.path, newFileNamePath, function (err) {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};




