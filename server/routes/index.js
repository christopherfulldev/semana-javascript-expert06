'use strict';
const logger = require('../server/util');
const config = require('../config');
const errorHandler = require('../error')
const controller = require('../controller');
const routesHandler = {
    handler: function (request, response, error) {
        return routesHandler.routes(request, response)
            .catch(error => errorHandler.handler(error, response));
    }, 

    routes: async function (request, response) {
        const { method, url } = request;
        
        if(method === 'GET' && url === '/') {
            response.writeHead(302, {
                'Location': config.location.home
            })
            
            return response.end();
        }

        if (method === 'GET' && url === '/home') {
            const { stream } = await controller.getFileStream(config.pages.homeHTML);
            
            return stream.pipe(response);
        };

        if (method === 'GET' && url === '/controller') {
            const { stream } = await controller.getFileStream(config.pages.controllerHTML);
            
            return stream.pipe(response);
        };

        if(method === 'GET') {
            const { stream, fileType } = await controller.getFileStream(url);
            const contentType = config.constants.CONTENT_TYPE[fileType];
            
            if(contentType){
                response.writeHead(200, {
                    'Content-Type': contentType
                })
            }
            
            return stream.pipe(response);
        }

        response.writeHead(404)
        
        return response.end()
    },
};

module.exports = routesHandler;