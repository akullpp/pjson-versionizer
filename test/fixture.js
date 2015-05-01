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

function createMockFs() {
    fs.mkdirSync('.tmp');
    fs.mkdirSync('.tmp/node_modules');
    fs.mkdirSync('.tmp/node_modules/b');
    fs.mkdirSync('.tmp/node_modules/a');
    fs.writeFileSync('.tmp/package.json', JSON.stringify(pjson));
    fs.writeFileSync('.tmp/node_modules/a/package.json', JSON.stringify(pjsonDepA));
    fs.writeFileSync('.tmp/node_modules/b/package.json', JSON.stringify(pjsonDepB));
}

function removeMockFs() {
    rimraf.sync('.tmp');
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
