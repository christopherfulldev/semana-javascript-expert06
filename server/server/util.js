'use strict';

const pino = require('pino');
const logger = pino({
    enabled: !(!!process.env.LOG_DISABLED),
    target: 'pino-pretty',
    options: {
        colorize: true,
    }
});

module.exports = logger;