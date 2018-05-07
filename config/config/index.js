'use strict';
let envFileName;

switch (process.env.NODE_ENV) {
    case 'production':
        envFileName = 'production';
        break;
    case 'sandbox':
        envFileName = 'sandbox';
        break;
    case 'test':
        envFileName = 'test';
        break;
    default:
        envFileName = 'development';
}

const defaultConfig = require('./default');
const envConfig = require('./' + envFileName);
const config = Object.assign(defaultConfig, envConfig);

module.exports = config;

