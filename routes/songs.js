'use strict';

const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');
const controller = require('../controllers/songs.controller');

/**
 * @swagger
 * definitions:
 *   UserAuth:
 *     required:
 *       - token
 *       - role
 *       - userId
 *       - name
 *       - isProfileFilled
 *     properties:
 *       token:
 *         type: string
 *       role:
 *         type: integer
 *       userId:
 *         type: integer
 *       name:
 *         type: string
 *       isProfileFilled:
 *         type: boolean
 */

/**
 * @swagger
 * /songs:
 *   get:
 *     tags: [songs]
 *     parameters:
 *
 *       - name: id
 *         in: query
 *         required: false
 *         type: integer
 *
 *       - name: random
 *         in: query
 *         required: false
 *         type: boolean
 *
 *       - name: name
 *         in: query
 *         description: Name of project
 *         required: false
 *         type: string
 *
 *       - name: page
 *         in: query
 *         type: integer
 *
 *       - name: limit
 *         in: query
 *         type: integer
 *         description: default=10
 *         default: 10
 *         minimum: 0
 *         maximum: 1000
 *
 *     produces:
 *       - application/json

 *     responses:
 *       200:
 *         description: List of songs
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Song'
 *       400:
 *         description: Invalid params
 *       default:
 *         description: Unexpected error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.get('/', isAdmin, controller.get);

/**
 * @swagger
 * /songs:
 *   post:
 *     tags: [songs]
 *     description: Returns user by email and password
 *     parameters:
 *       - name: name
 *         in: formData
 *         description: User's email
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         description: User's password
 *         required: true
 *         type: string
 *         default: 'mobidevQA01!'
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
router.post('/', isAdmin, controller.create);

/**
 * @swagger
 * /songs/{id}:
 *   put:
 *     tags: [songs]
 *     parameters:
 *
 *       - name: id
 *         in: path
 *         description: Project ID
 *         required: true
 *         type: number
 *
 *       - name: name
 *         in: formData
 *         type: string
 *
 *       - name: RightVariantId
 *         in: formData
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
router.put('/:id', isAdmin, controller.update);

/**
 * @swagger
 * /songs/upload/{id}:
 *   post:
 *     tags: [songs]
 *     parameters:
 *
 *       - name: is
 *         in: query
 *         description: SongId
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


/**
 * @swagger
 * /songs/add-genre:
 *   post:
 *     tags: [songs]
 *     description: Returns user by email and password
 *     parameters:
 *
 *       - name: SongId
 *         in: formData
 *         required: true
 *         type: integer
 *
 *       - name: GenreId
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
router.post('/add-genre', isAdmin, controller.addGenre);


/**
 * @swagger
 * /songs/remove-genre:
 *   post:
 *     tags: [songs]
 *     description: Returns user by email and password
 *     parameters:
 *
 *       - name: SongId
 *         in: formData
 *         required: true
 *         type: integer
 *
 *       - name: GenreId
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
router.post('/remove-genre', isAdmin, controller.removeGenre);


module.exports = ['/songs', router];
