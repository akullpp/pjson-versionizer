var chai = require('chai'),
    sut = require('../lib/versionize'),
    fixture = require('./fixture');

var expect = chai.expect;

describe('versionize', function () {

    beforeEach(function () {
        return fixture.createMockFs();
    });

    afterEach(function () {
        return fixture.removeMockFs().then(function (err) {
            if (err) throw err;
        });
    });

    it('should equalize devDependencies and dependencies if no flag is specified', function () {
        return sut.versionize('.tmp', {}).then(function () {
            return fixture.loadMockPjson().then(function (pjson) {
                expect(pjson.dependencies.a).to.equal(fixture.pjsonDepA.version);
                expect(pjson.devDependencies.b).to.equal(fixture.pjsonDepB.version);
            });
        });
    });

    //it('should only equalize dependencies if --deps is set', function () {
    //    return sut.versionize('.tmp', {deps: true}).then(function () {
    //        return fixture.loadMockPjson().then(function (pjson) {
    //            expect(pjson.dependencies.a).to.equal(fixture.pjsonDepA.version);
    //            expect(pjson.devDependencies.b).to.equal(fixture.pjson.devDependencies.b);
    //        });
    //    });
    //});

    it('should only equalize devDependencies if --ddeps is set');

    it('should use the semver prefix flag');

    it('should throw an error if there is no package.json');

    it('should throw an error if there are no installed modules');

    it('should throw an error if the --deps and --ddeps are specified');

    it('should throw an error if there are no dependencies and no devDependencies');

    it('should throw an error if there are no devDependencies and --ddeps is set');

    it('should throw an error if there are no dependencies and --deps is set');
});
