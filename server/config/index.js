'use strict';
const { dirname, join} = require('path');
const { fileURLToPath, pathToFileURL } = require('url');
const currentDirPath = dirname(fileURLToPath(pathToFileURL(__dirname).toString()))
const rootDirPath = join(currentDirPath, '../');
const audioDirPath = join(rootDirPath, 'audio');
const publicDirPath = join(rootDirPath, 'public');
const songsDirPath = join(audioDirPath, 'songs');

const normalizedPaths = {
    PORT: process.env.PORT || 3000,
    currentDirPath: currentDirPath,
    rootDirPath: rootDirPath,
    audioDirPath: audioDirPath,
    publicDirPath: publicDirPath,
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
        },
        audioMediaType: 'mp3',
        songVolume: '0.99',
        bitRateDivisor: 8,
        fallBackBitRate: '128000',
        conversationFile: join(songsDirPath, 'conversation.mp3'),
    },
};

module.exports = normalizedPaths;