'use strict';

/**
 * @swagger
 * definitions:
 *   Error:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   Success:
 *     type: object
 *     description: Default response for successful action
 *     properties:
 *       message:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   ValidationErrors:
 *     type: object
 *     required:
 *       - message
 *     properties:
 *       field:
 *         type: string
 *       field2:
 *         type: string
 *       field3:
 *         type: string
 *       message:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   Enum:
 *     type: object
 *     properties:
 *       value:
 *         type: string
 *       value2:
 *         type: string
 *       value3:
 *         type: string
 *       value4...:
 *         type: string
 */


/**
 *  ong
 */

/**
 * @swagger
 * definitions:
 *   Song:
 *     required:
 *       - id
 *       - name
 *       - url
 *       - RightVariantId
 *       - createdAt
 *       - updatedAt
 *     properties:
 *       id	:
 *         type: integer
 *       name:
 *         type: string
 *       url:
 *         type: string
 *       RightVariantId:
 *         type: integer
 *       Variants :
 *         type: array
 *         items:
 *              $ref: '#/definitions/Variant'
 *       createdAt:
 *         type: string
 *       updatedAt:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   Variant:
 *     required:
 *       - id
 *       - name
 *       - createdAt
 *       - updatedAt
 *     properties:
 *       id	:
 *         type: integer
 *       SongId :
 *         type: integer
 *       name :
 *         type: string
 *       Song :
 *         $ref: '#/definitions/Song'
 *       createdAt:
 *         type: string
 *       updatedAt:
 *         type: string
 */


