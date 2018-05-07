'use strict';

const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');
const controller = require('../controllers/variants.controller');

/**
 * @swagger
 * /variants/{id}:
 *   put:
 *     tags: [variants]
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

module.exports = ['/variants', router];
