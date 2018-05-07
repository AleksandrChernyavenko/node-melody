const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const isAdmin = require('../middlewares/isAdmin');
const controller = require('../controllers/users.controller');

router.get('/', isAdmin, controller.get);

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [users]
 *     description: Users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/UserAuth'
 *       400:
 *         description: Invalid params
 *       default:
 *         description: Unexpected error
 *         schema:
 *           $ref: '#/definitions/Error'
 */

router.post('/', isAuthenticated, isAdmin, function (req, res, next) {
    console.print('req.isAuthenticated()', req.isAuthenticated());
    console.print('req.user', req.user);
    res.send('respond with a resource');
});


/**
 * @swagger
 * /users/my:
 *   get:
 *     tags: [users]
 *     description: Users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/UserAuth'
 *       400:
 *         description: Invalid params
 *       default:
 *         description: Unexpected error
 *         schema:
 *           $ref: '#/definitions/Error'
 */

router.get('/my', isAuthenticated, function (req, res, next) {
    const user = {
        id: req.user.id,
        name: `${req.user.firstName} ${req.user.lastName}`,
        isAdmin: req.user.isAdmin,
        level: req.user.level,
        experience: req.user.experience,
    };
    res.json(user);
});

module.exports = ['/users', router];
