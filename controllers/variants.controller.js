'use strict';

const updateForm = require('../forms/variants/update.form.js');

class VariantsController {

    update(req, res, next) {

        updateForm.validate(req)
            .then(() => {
                return updateForm.update(req);
            })
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                next(error);
            });
    }


}

const controllerInstance = new VariantsController();

module.exports = controllerInstance;
