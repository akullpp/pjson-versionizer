var chai = require('chai'),
    expect = chai.expect,
    mockFs = require('mock-fs'),
    sut = require('../lib/versionize').versionize;

describe('versionize', function () {
    var dir = '/mock/';
    var options = {};

    afterEach(function () {
        mockFs.restore();
    });

    it('should throw an error if there is no package.json', function () {
        mockFs({
            '/mock/': {}
        });

        expect(function () {
            sut(dir, options);
        }).to.throw('No package.json in current working directory');
    });
});