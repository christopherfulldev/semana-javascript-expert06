'use strict';
const logger = require('../server/util');
const config = require('../config');
const controller = require('../controller');
const routesHandler = {
    handler: function (request, response) {
        return routesHandler.routes(request, response)
            .catch(error => logger.error(`Try again: ${error.stack}`))
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
        return response.end('hello')
    }
};

module.exports = routesHandler;