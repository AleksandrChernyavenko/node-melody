'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/levels.controller.js');
const isAdmin = require('../middlewares/isAdmin');
const isAuthenticated = require('../middlewares/isAuthenticated');

/**
 * @swagger
 * /levels/get-list/{GenreId}:
 *   get:
 *     tags: [level]
 *     description: Return levels
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of levels
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Department'
 *       400:
 *         description: Invalid params
 *         schema:
 *           $ref: '#/definitions/ValidationErrors'
 *       default:
 *         description: Unexpected error
 *         schema:
 *           $ref: '#/definitions/Error'
 */

router.get('/get-list/:GenreId',
    isAuthenticated,
    controller.getLevelsListByGenreId
);


/**
 * @swagger
 * /levels/add-song:
 *   post:
 *     tags: [songs]
 *     description: Returns user by email and password
 *     parameters:
 *
 *       - name: LevelId
 *         in: formData
 *         required: true
 *         type: integer
 *
 *       - name: SongId
 *         in: formData
 *         required: true
 *         type: integer
 *
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/Success'
 *       400:
 *         description: Invalid params
 *       default:
 *         description: Unexpected error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.post('/add-song', isAdmin, controller.addSong);


/**
 * @swagger
 * /levels/add-level-to-genre/{GenreId}:
 *   get:
 *     tags: [level]
 *     description: Return levels
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of levels
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Department'
 *       400:
 *         description: Invalid params
 *         schema:
 *           $ref: '#/definitions/ValidationErrors'
 *       default:
 *         description: Unexpected error
 *         schema:
 *           $ref: '#/definitions/Error'
 */

router.post('/add-level-to-genre/:GenreId',
    isAdmin,
    controller.addLevelToGenre
);



/**
 * @swagger
 * /levels/get-info/{LevelId}:
 *   get:
 *     tags: [level]
 *     description: Return levels
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of levels
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Department'
 *       400:
 *         description: Invalid params
 *         schema:
 *           $ref: '#/definitions/ValidationErrors'
 *       default:
 *         description: Unexpected error
 *         schema:
 *           $ref: '#/definitions/Error'
 */

router.get('/get-info/:LevelId',
    isAuthenticated,
    controller.getInfo
);


/**
 * @swagger
 * /levels/mark-as-completed/{LevelId}:
 *   post:
 *     tags: [level]
 *     description: Return levels
 *     parameters:
 *
 *       - name: score
 *         in: formData
 *         required: true
 *         type: integer
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of levels
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Department'
 *       400:
 *         description: Invalid params
 *         schema:
 *           $ref: '#/definitions/ValidationErrors'
 *       default:
 *         description: Unexpected error
 *         schema:
 *           $ref: '#/definitions/Error'
 */

router.post('/mark-as-completed/:LevelId',
    isAuthenticated,
    controller.markAsCompleted
);

module.exports = ['/levels', router];
