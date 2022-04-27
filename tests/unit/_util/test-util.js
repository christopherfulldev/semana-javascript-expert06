'use strict';
const { read } = require('fs');
const stream = require('stream');

const testUtils = {
    generateReadableStream: function (data) {
        return new stream.Readable({
            read() {
              for(const item of data) {
                this.push(item)
              }
      
              this.push(null)
            }
        })
    },
        
    generateWriteableStream: function (onData) {
        return new stream.Writable({
            write(chunk, enc, cb) {
              onData(chunk)
      
              cb(null, chunk)
            }
        })
    },

    defaulthandleParams: function() {
        const requestStream = testUtils.generateReadableStream(['requisition body']);
        const responseStream = testUtils.generateWriteableStream();
        
        const data = {
            request: Object.assign(requestStream, {
                headers: {},
                method: '',
                url: '',
            }),
            
            response: Object.assign(responseStream, {
                writeHead: jest.fn(),
                end: jest.fn(),
            }),
        };
        return {
            values: () => Object.values(data),
            ...data,
        }
    },
};

module.exports = testUtils;