'use strict';

var program = require('commander'),
    versionize = require('./versionize');

program
    .version(require('../package').version)
    .usage('[options]')
    .option('-t, --try', 'Only logs to console')
    .option('-p, --deps', 'Only sets production dependencies')
    .option('-d, --ddeps', 'Only sets development dependencies')
    .option('-s, --prefix [semver]', 'Semver prefix for all dependencies')
    .parse(process.argv);

if (program.deps && program.ddeps) {
    console.error('Both dependency flags can\'t be active at the same time');
}

versionize(process.cwd(), {
    try: program.try,
    deps: program.deps,
    ddeps: program.ddeps,
    prefix: program.prefix
});
