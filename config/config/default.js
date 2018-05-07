'use strict';

const path = require('path');
const fileStoragePath = path.resolve('/var/www/storage');

const config = {
    fileStoragePath: fileStoragePath,
    // fileStorageUrl: '/storage',
    fileStorageUrl: 'https://melody.local/storage',
    secret: 'hrdbsecrettokenhere',
    database: {
        username: 'melody_username',
        password: '0e90415df25cfcb9892176b003d03ed4',
        database: 'melody',
        host: '127.0.0.1',
        dialect: 'postgres'
    },
    sessionSecret:'34SDgsdgspxxxxxxxdfsGsdfsdf34534DDD',
    vkAppId:'5724001',
    vkApiSecret:'G5aPFNRUffkq6BAE0pOc',
};

module.exports = config;
