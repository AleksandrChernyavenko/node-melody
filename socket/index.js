'use strict';

const listRooms = require('./list_rooms');
const startGame = require('./game');
const authorization = require('./authorization');
//

module.exports = function (io) {

    io.set('origins', '*:*');
    authorization(io);
    listRooms(io);
    startGame(io);

};
