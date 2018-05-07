'use strict';
const HttpError = require('../components/errors').HttpError;
const moment = require('moment');

module.exports = function (err, req, res, next) {

    //it's expected behavior
    if (err instanceof HttpError) {
        res.status(err.status || 500);
        return res.json(err);
    }

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) { //don't log json parse error
        return res.json(err);
    }


    const errorContext = {
        url: req.url,
        params: req.params,
        query: req.query,
        body: req.body
        //TODO: add  "user:req.user"
    };

    // log this exception
    console.error(moment().format('DD-MM-YYYY, HH:mm:ss'), err, 'ErrorContext: ', errorContext);

    //
    // //hide stack from user
    // if (err && err.hasOwnProperty('stack')) {
    //     delete err.stack;
    //     throw err;
    // }

    res.status(500);
    return res.json({message: 'Internal Server Error'});
};
