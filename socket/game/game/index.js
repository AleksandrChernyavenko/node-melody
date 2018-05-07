'use strict';

const Game = require('./game').Game;

/**
 *
 * @param genreId
 * @param gameRoom
 * @returns {*|Game}
 */
module.exports.createGame = function (genreId,gameRoom) {
    return new Game(genreId,gameRoom)
};
