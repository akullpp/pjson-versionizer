'use strict';

var program = require('commander'),
    versionize = require('./versionize').versionize;

program
    .version(require('../package').version)
    .usage('[options]')
    .option('-d, --deps', 'Only sets production dependencies')
    .option('-dev, --ddeps', 'Only sets development dependencies')
    .option('-p, --prefix [semver]', 'Semver prefix for all dependencies')
    .parse(process.argv);

try {
    if (deps && ddeps) throw new Error('Both dependency flags can\'t be active at the same time');

    versionize(process.cwd(), {
        deps: program.deps,
        ddeps: program.ddeps,
        prefix: program.prefix
    });
} catch (err) {
    console.error(err.message);
}