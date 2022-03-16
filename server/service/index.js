'use strict';
const { join, extname } = require('path');
const { fsPromises } = require('fs/promises');
const config = require('../config');

const services = {
    createFileStream: function (filename) {
        return fs.createReadStream(filename);
    },

    getFileInfo: async function (file) {
        const fullFilePath = join(config.publicDirPath, file);
        console.log(fullFilePath);
        await fsPromises.access(fullFilePath); //validation/throw error
        const fileType = extname(fullFilePath);
        
        return {
            fileType: fileType,
            fileName: fullFilePath
        }
    },

    getFileStream: async function (file) {
        const { fileType, fileName } = await services.getFileInfo(file);

        return {
            stream: services.createFileStream(fileName),
            fileType
        };
    }, 


};

module.exports = services;
