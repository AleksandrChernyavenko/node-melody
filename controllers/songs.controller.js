'use strict';

const getForm = require('../forms/songs/get.form');
const updateForm = require('../forms/songs/update.form');
const uploadFile = require('../forms/songs/upload_file.form');
const createForm = require('../forms/songs/create.form');
const addGenreForm = require('../forms/songs/add_genre.form');
const removeGenreForm = require('../forms/songs/remove_genre.form');

class SongsController {

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

    uploadSong(req, res, next) {

        const songId = parseInt(req.params.id);

        uploadFile.validateUserId(req)
            .then(() => {
                return uploadFile.getUploadedFile(req, 'file');
            })
            .then((file) => {
                return uploadFile.validateFile(file);
            })
            .then((file) => {
                return uploadFile.saveFile(file, songId);
            })
            .then(() => {
                res.json({success:true});
            })
            .catch((error) => {
                next(error);
            });
    }



    addGenre(req, res, next) {

        addGenreForm.validate(req)
            .then(() => {
                return addGenreForm.addOneGenre(req);
            })
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                next(error);
            });
    }

    removeGenre(req, res, next) {

        removeGenreForm.validate(req)
            .then(() => {
                return removeGenreForm.removeOneGenre(req);
            })
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                next(error);
            });
    }



}

const controllerInstance = new SongsController();

module.exports = controllerInstance;
