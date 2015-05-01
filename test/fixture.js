'use strict';

var Q = require('q'),
    fs = require('fs'),
    rimraf = require('rimraf');

var pjson = {
        dependencies: {
            a: '*'
        },
        devDependencies: {
            b: '*'
        }
    },
    pjsonDepA = {
        name: 'a',
        version: '1.0.0'
    },
    pjsonDepB = {
        name: 'b',
        version: '2.0.0'
    };

function createDirectories() {
    var promiseMkdir = Q.nfbind(fs.mkdir);

    return promiseMkdir('.tmp')
        .then(promiseMkdir('.tmp/node_modules')
            .then(function () {
                Q.all([
                    promiseMkdir('.tmp/node_modules/b'),
                    promiseMkdir('.tmp/node_modules/a')
                ]);
            }));
}

function createFiles() {
    var promiseWriteFile = Q.nfbind(fs.writeFile);

    return Q.all([
        promiseWriteFile('.tmp/node_modules/b/package.json', JSON.stringify(pjsonDepB)),
        promiseWriteFile('.tmp/package.json', JSON.stringify(pjson)),
        promiseWriteFile('.tmp/node_modules/a/package.json', JSON.stringify(pjsonDepA))
    ]);
}

function createMockFs() {
    return createDirectories().then(function () {
        return createFiles();
    });
}

function removeMockFs() {
    var deferred = Q.defer();

    rimraf('.tmp/', deferred.resolve);

    return deferred.promise;
}

function loadMockPjson() {
    var promiseReadFile = Q.nfbind(fs.readFile);

    return promiseReadFile('.tmp/package.json').then(JSON.parse);
}

exports.createMockFs = createMockFs;
exports.removeMockFs = removeMockFs;
exports.loadMockPjson = loadMockPjson;
exports.pjson = pjson;
exports.pjsonDepA = pjsonDepA;
exports.pjsonDepB = pjsonDepB;
