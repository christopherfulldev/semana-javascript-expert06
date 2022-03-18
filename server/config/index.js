'use strict';
const { dirname, join} = require('path');
const { fileURLToPath, pathToFileURL } = require('url');
const currentDirPath = dirname(fileURLToPath(pathToFileURL(__dirname).toString()))
const rootDirPath = join(currentDirPath, '../');
const audioDirPath = join(rootDirPath, 'audio');
const publicDirPath = join(rootDirPath, 'public');

const normalizedPaths = {
    PORT: process.env.PORT || 5000,
    currentDirPath: currentDirPath,
    rootDirPath: rootDirPath,
    audioDirPath: audioDirPath,
    publicDirPath: publicDirPath,
    songsDirPath: join(audioDirPath, 'songs'),
    fxDirPath: join(rootDirPath, 'fx'),
    pages: {
        homeHTML: 'home/index.html',
        controllerHTML: 'controller/index.html',
    },
    location: {
        home: '/home',
    },
    constants: {
        CONTENT_TYPE: {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'text/js',
        }
    }
};

module.exports = normalizedPaths;