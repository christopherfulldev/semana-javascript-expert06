'use strict'

const logger = require("../server/util")

const errorHandler = {
    handler: function(error, response) {
        console.log(error);
        if(error.message.includes('ENOENT')) {
            logger.warn(`Asset not found ${error.stack}`);
            response.writeHead(404);

            return response.end();
        }
        
        logger.error(`Caugth error on API ${error.stack}`);
        response.writeHead(500);
        
        return response.end();
    }
};

module.exports = errorHandler;