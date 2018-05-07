const request = require('request');
const baseUrl = 'https://api.vk.com/method/';

exports.getUserData = function (user_id) {

    const url = `${baseUrl}users.get?user_ids=${user_id}`;


    return new Promise((resolve, reject) => {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                try{
                    body = JSON.parse(body);
                    return resolve(body.response[0]);
                }
                catch (e) {
                    return reject(error);
                }
            }
            return reject(error);
        });
    });
};