'use strict';
const models = require('../../../models');

const TURN_TIME = 1000 * 15;
const SONG_TIME = 1000 * 20;
const RELOAD_SONGS_TIME = 60 * 60 * 1000;

const SERVER_ACTIONS = {
    newSong: 'newSong',
    addUser: 'addUser',
    leaveUser: 'leaveUser',
    correctAnswer: 'correctAnswer',
    wrongAnswer: 'wrongAnswer',
};

const CLIENT_ACTIONS = {
    endTurn: 'endTurn',
};

const AWARD_LIST = {
    answeredFirst:1,
    answeredSecond:2,
    answeredThird:3,
};

const SONGS_PER_ROUND = 15;

class Game {


    constructor(genreId, room) {
        this.genreId = genreId;
        this.room = room;
        this.status = false;
        /**
         *
         * @type {Array<GameUser>}
         */
        this.users = [];
        this.songs = [];
        this.songIndex = 0;
        this.song = false;
        this.gameLoopInterval = false;

        this.startGame();

        setInterval(() => this.startGame(), RELOAD_SONGS_TIME);
    }

    answer(userId, answerId) {
        const user = this.findUserById(userId);
        const correct = this.isCorrectAnswer(answerId);

        if (!user.answered) {
            if (correct) {
                user.score += this.getScoreForAnswer();
                user.award = this.getAwardForAnswer();
                this.room.emit(SERVER_ACTIONS.correctAnswer, user);
            }
            else {
                this.room.emit(SERVER_ACTIONS.wrongAnswer, user);
            }
        }
        user.answered = true;

        this.checkForNextSong();

        return {
            success: correct,
            RightVariantId: this.song.RightVariantId,
            score: user.score,
        };
    }

    connect(user) {
        if(this.findUserById(user.id)) {
            return false;
        }
        this.users.push(user);
        this.room.emit(SERVER_ACTIONS.addUser, user);
        return true;
    }

    leave(user) {
        this.room.emit(SERVER_ACTIONS.leaveUser, user);
        this.users = this.users.filter((u) => u.id !== user.id);
        return true;
    }

    startGame() {

        loadSongs(this.genreId)
            .then((songs) => {
                this.songs = shuffle(songs);
                this.enableNextSong();
                this.reloadGameLoopInterval();
            });


    }

    reloadGameLoopInterval() {
        this.removeNextSongInterval();
        this.gameLoopInterval = setInterval(() => {
            this.updateAllUsersStateBeforeNewSong();
            this.enableNextSong();
        }, SONG_TIME);
    }

    removeNextSongInterval() {
        if (this.gameLoopInterval) {
            clearInterval(this.gameLoopInterval);
        }
    }

    enableNextSong() {
        this.song = this.songs[this.songIndex];
        this.song.nextSongAt = new Date().getTime() + SONG_TIME;
        this.songIndex++;
        if (!this.songs[this.songIndex]) {
            this.songIndex = 0;
        }
        this.room.emit(SERVER_ACTIONS.newSong, this.song);
    }

    checkForNextSong() {
        const allAnswered = !this.users.find((user) => !user.answered);
        if (allAnswered) {
            //time for see result of last user answer
            const TIME_FOR_ANIMATE = 3000;
            if (this.song.nextSongAt - new Date().getTime() < TIME_FOR_ANIMATE) {
                return false;
            }

            this.removeNextSongInterval();
            setTimeout(() => {
                this.reloadGameLoopInterval();
                this.enableNextSong();
                this.updateAllUsersStateBeforeNewSong();
            }, TIME_FOR_ANIMATE);

        }
    }

    updateAllUsersStateBeforeNewSong(){
        this.users = this.users.map((user) => {
            user.answered = false;
            user.award = false;
            return user;
        });
    }

    getGameState() {

        return {
            users: this.users,
            song: this.song,
        }

    }

    //utils
    /**
     *
     * @param userId
     * @returns {GameUser|false}
     */
    findUserById(userId) {
        return this.users.find((user) => user.id === userId);
    }

    /**
     *
     * @param answerId
     * @returns {boolean}
     */
    isCorrectAnswer(answerId) {
        return this.song.RightVariantId === answerId;
    }

    /**
     *
     * @returns {number}
     */
    getScoreForAnswer() {
        const countAlreadyAnsweredUsers = this.users.filter((user) => user.award).length;

        switch (countAlreadyAnsweredUsers) {
            case 0: //first Place
                return 4;
            case 1: //second Place
                return 3;
            case 2: //second Place
                return 2;
            default:
                return 1;
        }
    }

    /**
     *
     * @returns {number|boolean}
     */
    getAwardForAnswer() {
        const countAlreadyAnsweredUsers = this.users.filter((user) => user.award).length;

        switch (countAlreadyAnsweredUsers) {
            case 0: //first Place
                return AWARD_LIST.answeredFirst;
            case 1: //second Place
                return AWARD_LIST.answeredSecond;
            case 2: //second Place
                return AWARD_LIST.answeredThird;
            default:
                return false;
        }
    }

}


module.exports.Game = Game;

function loadSongs(GenreId) {
    return models.Song.findAll({
        include: [
            {
                model: models.Variant,
            },
            {
                model: models.Genre,
                where:{
                    id:GenreId
                }
            },
        ],
    })
        .then((songs) => {
            songs = songs.map((song) => song.getAsApiResponse());
            return songs;
        });
}


function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/**
 * @typedef {Object} GameUser
 * @property {number} id
 * @property {boolean} answered
 * @property {number|boolean} award
 */



