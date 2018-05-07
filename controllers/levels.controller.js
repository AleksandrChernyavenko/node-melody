'use strict';

const getInfoForm = require('../forms/levels/get_info.form');
const addSongForm = require('../forms/levels/add_song.form');
const addLevelToGenreForm = require('../forms/levels/add_level_to_genre.form');
const getLevelsListByGenreIdForm = require('../forms/levels/get_level_list_by_genreId_info.form');
const markAsCompletedForm = require('../forms/levels/mark_as_completed.form');

class GenreController {


    getLevelsListByGenreId(req, res, next) {

        getLevelsListByGenreIdForm.validate(req)
            .then(() => {
                return getLevelsListByGenreIdForm.find(req);
            })
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                next(error);
            });
    }


    addSong(req, res, next) {

        addSongForm.validate(req)
            .then(() => {
                return addSongForm.addOneSong(req);
            })
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                next(error);
            });
    }

    addLevelToGenre(req, res, next) {
        addLevelToGenreForm.validate(req)
            .then(() => {
                return addLevelToGenreForm.addOneLevel(req);
            })
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                next(error);
            });
    }

    getInfo(req, res, next) {

        getInfoForm.validate(req)
            .then(() => {
                return getInfoForm.find(req);
            })
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                next(error);
            });
    }

    markAsCompleted(req, res, next) {

        markAsCompletedForm.validate(req)
            .then(() => {
                return markAsCompletedForm.mark(req);
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
