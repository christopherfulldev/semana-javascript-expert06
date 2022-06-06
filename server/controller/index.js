'use strict';
const service  = require('../service');

const controller = Object.create(service);  

controller.createClientStream = function () {
  const {
    id, 
    clientFileStream 
  } = service.createFileStream();

  const onClose = () => {
    console.log(`clossing connection of ${id}`);
    service.removeFileStream(id);
  };
  return {
    stream: clientFileStream,
    onClose,
  }
},

module.exports = controller;