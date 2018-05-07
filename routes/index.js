'use strict';

const path = require('path');
const fs = require('fs');
const config = require('../config/config');
const swaggerJSDoc = require('swagger-jsdoc');



module.exports = loadControllers;

function loadControllers(app) {

    bootstrap(__dirname).forEach(load);

    function bootstrap(dir) {
        function isNotIndexFile(file) {
            return path.basename(file).toLowerCase() !== 'index.js';
        }

        function isJsFile(file) {
            return path.extname(file).toLowerCase() === '.js';
        }

        let files = fs.readdirSync(dir)
            .filter(isJsFile)
            .filter(isNotIndexFile);

        let routesFiles = files.map(function (file) {
            return path.join(__dirname, file);
        });

        includeSwagger(routesFiles);



        return files;
    }

    function load(file) {

        if (file === '!_shared_doc_for_swagger.js') {
            return false;
        }

        let ctrl = require(path.join(__dirname, file));
        let isObj = typeof ctrl === 'object' && ctrl !== null;


        if (Array.isArray(ctrl)) {
            app.use('/api' + ctrl[0], ctrl[1]);
        } else if (isObj) {
            app.use(ctrl.path, ctrl.controller);
        } else {
            app.use('/api', ctrl);
        }
    }



    function includeSwagger(routesFiles) {


        app.get('/api/api.json', function (req, res) {

            const openApi = {
                info: {
                    title: 'title',
                    version: 1.02
                },
                host: req.hostname,
                basePath:'/api',
                tags: [{
                    'name': 'users',
                    'description': 'User operations'
                }],
                securityDefinitions: {
                    Bearer: {
                        type: 'apiKey',
                        name: 'Authorization',
                        in: 'header'
                    }
                }
            };


            // swagger-jsdoc
            const swaggerSpec = swaggerJSDoc({
                swaggerDefinition: openApi,
                apis: routesFiles
            });

            res.setHeader('Content-Type', 'application/json');
            res.send(swaggerSpec);
        });

        return app;
    }
}


