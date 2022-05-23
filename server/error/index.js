'use strict';
const errorHandler = {
    handler: function(error, response) {
        if(error.message.includes('ENOENT')) {
            response.writeHead(404);
            return response.end();
        };
        response.writeHead(500);
        return response.end();
    }
};

module.exports = errorHandler;