'use strict';

const config = require('../config/config');
const express = require('express');
const router = express.Router();
const vk = require('../components/vk');
const md5 = require('md5');
const passport = require('passport');

router.get('/', passport.authenticate('local'), function (req, res, next) {

    //https://vk.com/dev/apps_init
    let {viewer_id, access_token, auth_key, api_id, hash} = req.query;

    if (auth_key !== md5(api_id + '_' + viewer_id + '_' + config.vkApiSecret)) {
        return next(new Error);
    }
    hash = hash || '';
    res.redirect(`/${hash}`);
});

module.exports = ['/init', router];
