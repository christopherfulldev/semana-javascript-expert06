'use strict';

const server = require('./server');
const logger = require('./server/util');
const normalizedPaths = require('./config');

server.listen(normalizedPaths.PORT)
    .on('listening', () => logger.info(`Server running on port ${normalizedPaths.PORT}`));