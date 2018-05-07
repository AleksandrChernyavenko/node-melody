'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/genres.controller.js');
const isAdmin = require('../middlewares/isAdmin');
const isAuthenticated = require('../middlewares/isAuthenticated');

/**
 * @swagger
 * /genres:
 *   get:
 *     tags: [genre]
 *     description: Return genres
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of genres
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

router.get('/',
    isAdmin,
    controller.get
);


/**
 * @swagger
 * /genres/list-with-progress:
 *   get:
 *     tags: [genre]
 *     description: Return genres list-with-progress
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of genres
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

router.get('/list-with-progress',
    isAuthenticated,
    controller.getListWithProgress
);

/**
 * @swagger
 * /genres:
 *   post:
 *     tags: [genre]
 *     description: Create new department
 *     parameters:
 *       - name: name
 *         in: formData
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Created department
 *         schema:
 *           $ref: '#/definitions/Department'
 *       400:
 *         description: Invalid params
 *         schema:
 *           $ref: '#/definitions/ValidationErrors'
 *       403:
 *         description: Access denied
 *       default:
 *         description: Unexpected error
 *         schema:
 *           $ref: '#/definitions/Error'
 */

router.post('/',
    isAdmin,
    controller.create
);


/**
 * @swagger
 * /genres/{id}:
 *   put:
 *     tags: [genre]
 *     description: Update department by id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Note ID
 *         required: true
 *         type: number
 *       - name: name
 *         in: formData
 *         type: string
 *         required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/Department'
 *       400:
 *         description: Invalid params
 *         schema:
 *           $ref: '#/definitions/ValidationErrors'
 *       403:
 *         description: Access denied
 *       default:
 *         description: Unexpected error
 *         schema:
 *           $ref: '#/definitions/Error'
 */

router.put('/:id',
    isAdmin,
    controller.update
);

/**
 * @swagger
 * /genres/{id}:
 *   delete:
 *     tags: [genre]
 *     description: Delete department
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id
 *         required: true
 *         type: number
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Invalid params
 *         schema:
 *           $ref: '#/definitions/ValidationErrors'
 *       403:
 *         description: Access denied
 *       default:
 *         description: Unexpected error
 *         schema:
 *           $ref: '#/definitions/Error'
 */

router.delete('/:id',
    isAdmin,
    controller.delete
);


/**
 * @swagger
 * /genres/upload/{id}:
 *   post:
 *     tags: [genre]
 *     parameters:
 *
 *       - name: id
 *         in: params
 *         description: GenreId
 *         required: true
 *         type: integer
 *         format: int32
 *
 *       - name: file
 *         in: formData
 *         description: "file to upload"
 *         type: file
 *         required: true
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
router.post('/upload/:id', isAdmin, controller.uploadSong);

module.exports = ['/genres', router];
