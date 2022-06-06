'use strict';
const server = require('./server');
const normalizedPaths = require('./config');

server.listen(normalizedPaths.PORT)
    .on('listening', () => console.log(`Server running on port ${normalizedPaths.PORT}`));