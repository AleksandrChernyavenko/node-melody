'use strict';

const models = require('../../models');
const debug = require('debug')('SearchGame');
const NAMESPACE_NAME = '/list-rooms';

const RELOAD_GENRES_INTERVAL = 1000 * 60 * 30;
const BROADCAST_INTERVAL = 1000 * 5;

const ACTIONS = {
    update: 'update',
};

module.exports = function (io) {


    let genres = [];

    const searchGameNamespace = io.of(NAMESPACE_NAME);

    searchGameNamespace.on('connection', function (socket) {

        debug('searchGameNamespace.on.connection');

        sendUpdates();
        setInterval(sendUpdates, BROADCAST_INTERVAL);


        socket.on('disconnect', function () {
            clearInterval(BROADCAST_INTERVAL);
        });

        function sendUpdates() {
            socket.emit(ACTIONS.update, getRoomsInfo());
        }

    });


    /**
     *
     * @returns {Array}
     */
    function getRoomsInfo() {

        return genres.map((genre) => {
            return {
                roomId: genre.id,
                userCount: getUserCount(genre.id),
                name: genre.name,
                image: genre.getUrl()
            }
        });

    }

    function getUserCount(id) {
        return Object.keys(io.nsps[`/game${id}`].sockets).length;
    }


    function loadAllGenres() {
        models.Genre.findAll()
            .then((items) => {
                genres = items;
            });
    }

    loadAllGenres();
    setInterval(loadAllGenres, RELOAD_GENRES_INTERVAL)
};
