'use strict';
const config = require('../config/config');
const models = require('../models/');
const md5 = require('md5');
const vk = require('../components/vk');

module.exports = function (req, viewer_id, api_id, done) {

    const auth_key = req.query.auth_key;
    const vkAccessToken = req.query.access_token;

    if (auth_key !== md5(api_id + '_' + viewer_id + '_' + config.vkApiSecret)) {
        return done(new Error);
    }


    models.User
        .findOne({
            where: {
                vkId: viewer_id,
            }
        })
        .then((user) => {
            if (!user) {
                return registerUser(viewer_id, vkAccessToken);
            }
            return user;
        })
        .then((user) => {

            if (!user) {
                return done(null, false);
            }

            user.vkAccessToken = vkAccessToken;
            user.save();
            return done(null, user, {scope: 'all'});
        })
        .catch((error) => {
            return done(error);
        });

};

/**
 *
 * @param viewer_id
 * @param vkAccessToken
 * @returns {Promise.<Object>}
 */
function registerUser(viewer_id, vkAccessToken) {
    return vk.getUserData(viewer_id)
        .then((user) => {
            console.print('vk.getUserData',user);
            return models.User.create({
                vkId: user.uid,
                vkAccessToken: vkAccessToken,
                firstName: user.first_name,
                lastName: user.last_name,
            });
        })
        .then((user) => {

            return models.User.findByPrimary(user.id);
        })
}


