'use strict';

var chalk = require('chalk');
var program = require('commander');
var versionize = require('./pjson-versionizer');

program
    .version(require('../package').version)
    .usage('[options]')
    .option('--ddeps', 'Only sets development dependencies')
    .option('--deps', 'Only sets production dependencies')
    .option('--prefix [semver]', 'Semver prefix for all dependencies')
    .option('--dry', 'Only logs to console')
    .parse(process.argv);

if (program.deps && program.ddeps) {
    console.log(chalk.red('Both dependency flags can\'t be active at the same time'));
}

versionize(process.cwd(), {
    dry: program.dry,
    deps: program.deps,
    ddeps: program.ddeps,
    prefix: program.prefix
});
