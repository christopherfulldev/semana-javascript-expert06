'use strict';
const { 
  createServer 
} = require('http');

const routesHandler = require('../routes');
const createdServer = createServer(routesHandler.handler);

module.exports = createdServer;


