'use strict';
const gameFactory = require('./game');
const models = require('../../models');

const NAMESPACE_NAME = '/game';

module.exports = function (io) {

    models.Genre.findAll()
        .then((genres) => {
            genres.forEach((genre) => {
                initNamespace(io, genre.id);
            })
        });

    // initNamespace(io, 1);
};

function initNamespace(io, id) {
    const gameNamespace = io.of(NAMESPACE_NAME + `${id}`);
    const gameRoom = gameNamespace.to(id);
    const game = gameFactory.createGame(id, gameRoom);

    gameNamespace.on('connection', function (socket) {

        //TODO:check unique user in each game
        const user = getUser(socket);

        socket.emit('currentUser', user);
        const joinedToGame =  game.connect(user);
        if(!joinedToGame) {
            socket.emit('duplicateRoom');
            return socket.disconnect();
        }
        socket.join(id);
        socket.emit('updateAll', game.getGameState());


        socket.on('answer', function (answerId, fn) {
            fn(game.answer(user.id, answerId));
        });

        socket.on('newMessage', function (msg) {
            gameRoom.emit('newMessage', msg);
        });

        socket.on('disconnect', function () {
            if (game) {
                game.leave(user);
            }
        });

    });

}

function getUser(socket) {
    const user = {
        id: socket.request.user.id,
        score: 0,
        answered: false,
        name: `${socket.request.user.firstName} ${socket.request.user.lastName}`,
    };

    return socket.user = user;
}
