var chai = require('chai'),
    fixture = require('./fixture'),
    sut = require('../lib/versionize'),
    expect = chai.expect;

describe('versionize', function () {

    beforeEach(function () {
        fixture.createMockFs();
    });

    afterEach(function () {
        fixture.removeMockFs();
    });

    it('should equalize devDependencies and dependencies if no flag is specified', function () {
        return sut('.tmp', {}).then(function () {
            return fixture.loadMockPjson().then(function (pjson) {
                expect(pjson.dependencies.a).to.equal(fixture.pjsonDepA.version);
                expect(pjson.devDependencies.b).to.equal(fixture.pjsonDepB.version);
            });
        });
    });

    it('should only equalize dependencies if --deps is set', function () {
        return sut('.tmp', {deps: true}).then(function () {
            return fixture.loadMockPjson().then(function (pjson) {
                expect(pjson.dependencies.a).to.equal(fixture.pjsonDepA.version);
                expect(pjson.devDependencies.b).to.equal(fixture.pjson.devDependencies.b);
            });
        });
    });

    it('should only equalize devDependencies if --ddeps is set', function () {
        return sut('.tmp', {ddeps: true}).then(function () {
            return fixture.loadMockPjson().then(function (pjson) {
                expect(pjson.dependencies.a).to.equal(fixture.pjson.dependencies.a);
                expect(pjson.devDependencies.b).to.equal(fixture.pjsonDepB.version);
            });
        });
    });

    it('should use the semver prefix flag', function () {
        var testPrefix = '~';

        return sut('.tmp', {prefix: testPrefix}).then(function () {
            return fixture.loadMockPjson().then(function (pjson) {
                expect(pjson.dependencies.a).to.equal(testPrefix + fixture.pjsonDepA.version);
                expect(pjson.devDependencies.b).to.equal(testPrefix + fixture.pjsonDepB.version);
            });
        });
    });

    it('should not write the changes if the try flag is set', function () {
        return sut('.tmp', {try: true}).then(function () {
            return fixture.loadMockPjson().then(function (pjson) {
                expect(pjson.dependencies.a).to.equal(fixture.pjson.dependencies.a);
                expect(pjson.devDependencies.b).to.equal(fixture.pjson.devDependencies.b);
            });
        });
    });

    it('should throw an error if there is no package.json');

    it('should throw an error if there are no installed modules');

    it('should throw an error if the --deps and --ddeps are specified');

    it('should throw an error if there are no dependencies and no devDependencies');

    it('should throw an error if there are no devDependencies and --ddeps is set');

    it('should throw an error if there are no dependencies and --deps is set');
});
