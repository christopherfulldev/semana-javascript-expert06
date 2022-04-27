'use strict';
const sinon = require('sinon');
const config  = require('../../../../server/config');
const routesHandler = require('../../../../server/routes');
const testUtils = require('../../_util/test-util');
const controller = require('../../../../server/controller');
const service = require('../../../../server/service');


describe('#Routes - test site for API response', () => {
    
    beforeEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    }),
    
    controller.prototype = service;
    
    test('GET / - should redirect to home page', async () => {
        const params = testUtils.defaulthandleParams();
        params.request.method = 'GET';
        params.request.url = '/';
        
        await routesHandler.handler(...params.values());
        
        expect(params.response.writeHead).toBeCalledWith(
            302, 
            {
                'Location': config.location.home,
            }
        );

        expect(params.response.end).toHaveBeenCalled();
    }),

    test(`GET /home - should response with ${config.pages.homeHTML} file stream`, async () => {
        const params = testUtils.defaulthandleParams();
        params.request.method = 'GET';
        params.request.url = '/home';
        const mockFileStream = testUtils.generateReadableStream(['data']);
console.log('contoller.prototype', controller.prototype
    )
        jest.spyOn(
            controller.prototype,
            controller.prototype.getFileStream.name,
        ).mockResolvedValue({
            stream: mockFileStream,
        });
        
        jest.spyOn(
            mockFileStream,
            'pipe'
        ).mockReturnValue();

        await routesHandler.handler(...params.values());
        
        expect(controller.prototype.getFileStream).toBeCalledWith(config.pages.homeHTML);
        expect(mockFileStream.pipe).toHaveBeenCalledWith(params.response);
    }),

    test(`GET / controller - should response with ${config.pages.controllerHTML} file stream`, async () => {
        const params = testUtils.defaulthandleParams();
        params.request.method = 'GET';
        params.request.url = '/controller';
        const mockFileStream = testUtils.generateReadableStream(['data']);

        jest.spyOn(
            controller,
            'getFileStream',
        ).mockResolvedValue({
            stream: mockFileStream,
        });
        
        jest.spyOn(
            mockFileStream,
            'pipe'
        ).mockReturnValue();

        await routesHandler.handler(...params.values());
        
        expect(controller.getFileStream).toBeCalledWith(config.pages.controllerHTML);
        expect(mockFileStream.pipe).toHaveBeenCalledWith(params.response);
    }),

    test('GET /index.html - should response with stream', async () => {
        const params = testUtils.defaulthandleParams();
        const expectedFileName = '/index.html';
        params.request.method = 'GET';
        params.request.url = expectedFileName;
        const expectedFileType = '.html';
        const mockFileStream = testUtils.generateReadableStream(['data']);

        jest.spyOn(
            controller,
            'getFileStream',
        ).mockResolvedValue({
            stream: mockFileStream,
            type: expectedFileType,
        });
        
        jest.spyOn(
            mockFileStream,
            'pipe'
        ).mockReturnValue();

        await routesHandler.handler(...params.values());
        
        expect(controller.getFileStream).toBeCalledWith(expectedFileName);
        expect(mockFileStream.pipe).toHaveBeenCalledWith(params.response);
        expect(params.response.writeHead).not.toHaveBeenCalledWith(
            200, {
                'Content-Type': config.constants.CONTENT_TYPE[expectedFileType],
            }
        );
    });

    test('GET /file.ext - should response with stream', async () => {
        const params = testUtils.defaulthandleParams();
        const expectedFileName = '/file.ext';
        params.request.method = 'GET';
        params.request.url = expectedFileName;
        const expectedFileType = '.ext';
        const mockFileStream = testUtils.generateReadableStream(['data']);

        jest.spyOn(
            controller,
            'getFileStream',
        ).mockResolvedValue({
            stream: mockFileStream,
            type: expectedFileType,
        });
        
        jest.spyOn(
            mockFileStream,
            'pipe'
        ).mockReturnValue();

        await routesHandler.handler(...params.values());
        
        expect(controller.getFileStream).toBeCalledWith(expectedFileName);
        expect(mockFileStream.pipe).toHaveBeenCalledWith(params.response);
        expect(params.response.writeHead).not.toHaveBeenCalledWith();
    });

    test('POST /unknown - given an inexistent rout it should respond with error 404', async () => {
        const params = testUtils.defaulthandleParams();
        params.request.method = 'POST';
        params.request.url = '/unknown';
        const mockFileStream = testUtils.generateReadableStream(['data']);

        await routesHandler.handler(...params.values());
        
        expect(params.response.writeHead).toHaveBeenCalledWith(404);
        expect(params.response.end).toHaveBeenCalled();
    });
    
    describe('exceptions', () => {
        test('given inexistent file it should respond with error 404', async () => {
            const params = testUtils.defaulthandleParams();
            params.request.method = 'GET';
            params.request.url = '/index.png';
            const mockedError = Error('Error: ENOENT: no such file or directory');
            const expectedError = Object.create(mockedError);
            
            jest.spyOn(
                controller,
                'getFileStream',
            ).mockRejectedValue(expectedError);
    
            await routesHandler.handler(...params.values());
            
            expect(params.response.writeHead).toHaveBeenCalledWith(404);
            expect(params.response.end).toHaveBeenCalled();
        }),

        test('Given an error it should respond with error 500', async () => {
            const params = testUtils.defaulthandleParams();
            params.request.method = 'GET';
            params.request.url = '/index.png';
            const mockedError = Error('Error:');
            const expectedError = Object.create(mockedError);
            
            jest.spyOn(
                controller,
                'getFileStream'
            ).mockRejectedValue(expectedError);
    
            await routesHandler.handler(...params.values());
            
            expect(params.response.writeHead).toHaveBeenCalledWith(500);
            expect(params.response.end).toHaveBeenCalled();
        });
    });
});