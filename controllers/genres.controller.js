'use strict';

const getForm = require('../forms/genres/get.form.js');
const createForm = require('../forms/genres/create.form.js');
const updateForm = require('../forms/genres/update.form.js');
const deleteForm = require('../forms/genres/delete.form.js');
const uploadFile = require('../forms/genres/upload_file.form');
const getListWithProgressForm = require('../forms/genres/get_list_with_progress.form');

class GenreController {

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

    create(req, res, next) {

        createForm.validate(req)
            .then(() => {
                return createForm.create(req);
            })
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                next(error);
            });
    }

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

    delete(req, res, next) {
        deleteForm.validate(req)
            .then(() => {
                return deleteForm.delete(req);
            })
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                return next(error);
            });
    }

    uploadSong(req, res, next) {

        const GenreId = parseInt(req.params.id);

        uploadFile.validateUserId(req)
            .then(() => {
                return uploadFile.getUploadedFile(req, 'file');
            })
            .then((file) => {
                return uploadFile.validateFile(file);
            })
            .then((file) => {
                return uploadFile.saveFile(file, GenreId);
            })
            .then(() => {
                res.json({success:true});
            })
            .catch((error) => {
                next(error);
            });
    }

    getListWithProgress(req, res, next) {

        getListWithProgressForm.validate(req)
            .then(() => {
                return getListWithProgressForm.find(req);
            })
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                next(error);
            });
    }

}

const controllerInstance = new GenreController();

module.exports = controllerInstance;
