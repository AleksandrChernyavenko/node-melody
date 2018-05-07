'use strict';

const getForm = require('../forms/users/get.form.js');

class UsersController {

    get(req, res, next) {

        getForm.validate(req)
            .then(() => {
                return getForm.find(req);
            })
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                next(error);
            });
    }


}

const controllerInstance = new UsersController();

module.exports = controllerInstance;
