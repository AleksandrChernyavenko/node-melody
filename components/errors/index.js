'use strict';

const http = require('http');
const util = require('util');

exports.HttpError = HttpError;
exports.ForbiddenHttpException = ForbiddenHttpException;
exports.NotFoundException = NotFoundException;
exports.ValidationException = ValidationException;
exports.UnauthorizedException = UnauthorizedException;


function HttpError(statusCode, message) {
    Error.apply(this, arguments);
    this.status = statusCode;
    this.message = message || http.STATUS_CODES[statusCode] || 'Error';
}

util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';
HttpError.prototype.toJSON = function () {
    return {
        message: this.message
    };
};

function ForbiddenHttpException(message = 'Forbidden') {
    HttpError.call(this, 403,  message);
}
util.inherits(ForbiddenHttpException, HttpError);
ForbiddenHttpException.prototype.name = 'ForbiddenHttpException';


function NotFoundException(message) {
    HttpError.call(this, 404, message);
}
util.inherits(NotFoundException, HttpError);
NotFoundException.prototype.name = 'NotFoundException';


function UnauthorizedException(message = 'Unauthorized') {
    HttpError.call(this, 401, message);
}
util.inherits(UnauthorizedException, HttpError);
UnauthorizedException.prototype.name = 'UnauthorizedException';

function ValidationException(message) {
    HttpError.call(this, 400, message);
}
util.inherits(ValidationException, HttpError);
ValidationException.prototype.name = 'ValidationException';
ValidationException.prototype.toJSON = function () {

    const jsonObject = {};
    if (typeof this.message === 'string') {
        jsonObject.message = this.message;
    }
    else {
        let message = '';
        for (let attr in this.message) {
            if (this.message[attr] && this.message[attr]['msg']) {
                message = message + ' ' + this.message[attr]['msg'];
                jsonObject[attr] = this.message[attr]['msg'];
            }
            else {
                message = message + ' ' + this.message[attr];
                jsonObject[attr] = this.message[attr];
            }
        }
        jsonObject.message = message;
    }


    return jsonObject;
};

