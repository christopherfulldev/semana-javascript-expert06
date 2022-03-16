'use strict';
const path = require('path');
const { fileURLToPath } = require('url');

const normalizedPaths = {
    PORT: process.env.PORT || 3000,
    rootDirPath: path.format(__dirname, '../../../semana-javascript-expert06'),
    audioDirPath: path.resolve(__dirname, '../../client/audio'),
    publicDirPath: path.resolve(__dirname, '../../client/public'),
    songsDirPath: path.resolve(__dirname, '../../client/audio/songs'),
    fxDirPath: path.resolve(__dirname,'../../client/audio/fx'),
    pages: {
        homeHTML: path.resolve(__dirname,'../../client/public/home/index.html'),
        controllerHTML: path.resolve(__dirname, '../../client/public/controller/index.html'),
    },
    location: {
        home: path.resolve(__dirname,'../../client/public/home/index.html'),
    }
};

module.exports = normalizedPaths;