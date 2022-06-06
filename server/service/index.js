'use strict';
const { join, extname } = require('path');
const fsPromises = require('fs/promises');
const fs = require('fs');
const streamsAsync  = require('stream/promises');
const randomUUID = require('crypto');
const PassThrough = require('stream');
const throttle = require('throttle');
const childProcess = require('child_process');
const config = require('../config');

const services = {
    initializer: (function () {
        this.clientStreams = new Map();
        this.currentSong = config.constants.conversationFile;
        this.currentBitRate = 0;
        this.throttleTransform = {};
        this.currentRedable = {};
        return this
    })(),

    createClientStream: function () {
        const id = randomUUID();
        const clientStream = new PassThrough();
        this.clientStreams.set(id, clientStream);
        return {
            id,
            clientStream,
        };
    },

    removeClientStream: function () {
        this.clientStreams.delete(id);
    },

    broadcast: function () {
        return new Writable({
            write: (chunk, enc, cb) => {
                this.clientStreams;
            }
        })
    },

    startStream: async function () {
        const bitRate = services.currentBitRate =  (await services.getBitRate(services.currentSong)) / config.constants.bitRateDivisor;
        const throttleTransform = services.throttleTransform = new throttle(bitRate);
        const songRedable = this.currentRedable = services.createFileStream(currentSong);
        streamsAsync
            .pipeline(
                songRedable,
                throttleTransform,
            )
    },

    executeSoxCommand: function (args) {
        return childProcess.spawn('sox', args);
    },

    getBitRate: async function (audio) {
        try {
            const args = [
                '--i',
                '-b',
                audio
            ];
            const {
                stderr,
                stdout,
                stdin
            } = services.executeSoxCommand(args);
            const [success, error] = [stdout, stderr]
                .map(stream => stream.read());
            error ? 
                await Promise.reject(error) :
                    success
                        .toString()
                        .trim() 
                        .repalce(/k/, '000');
        } catch (error) {
            return config.constants.fallBackBitRate;
        }
    },

    createFileStream: function (filename) {
        return fs.createReadStream(filename);
    },

    getFileInfo: async function (file) {
        const fullFilePath = join(config.publicDirPath, file);
        await fsPromises.access(fullFilePath); //validation/throw error
        const fileType = extname(fullFilePath);
        
        return {
            fileType: fileType,
            fileName: fullFilePath,
        };
    },

    getFileStream: async function (file) {
        const { fileType, fileName } = await services.getFileInfo(file);
        return {
            stream: services.createFileStream(fileName),
            fileType,
        };
    }, 
};

module.exports = services;
