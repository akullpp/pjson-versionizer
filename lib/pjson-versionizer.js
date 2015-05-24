'use strict';

var _ = require('lodash');
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');
var readInstalled = require('read-installed');

module.exports = function (dir, options) {
    var promiseReadFile = Promise.promisify(fs.readFile);
    var promiseReadInstalled = Promise.promisify(readInstalled);
    var promiseWriteFile = Promise.promisify(fs.writeFile);
    var config = _.extend({
        dir: dir,
        packageJson: path.join(dir, 'package.json')
    }, options);

    return Promise.all([
        promiseReadFile(config.packageJson)
            .then(JSON.parse)
            .catch(function (err) {
                console.error(chalk.red('Couldn\'t read package.json\n'), err);
            }),
        promiseReadInstalled(config.dir, {
            dev: !config.deps,
            depth: 0
        })
    ]).spread(function (pjson, modules) {
        var oldDevDeps = pjson.devDependencies;
        var oldProdDeps = pjson.dependencies;
        var newDevDeps = null;
        var newProdDeps = null;
        var devDepsChanged;
        var prodDepsChanged;

        if (!config.deps && oldDevDeps) {
            newDevDeps = equalize(oldDevDeps, config.prefix, modules);
        }
        if (!config.ddeps && oldProdDeps) {
            newProdDeps = equalize(oldProdDeps, config.prefix, modules);
        }

        if (!config.dry) {
            devDepsChanged = newDevDeps && !_.isEqual(oldDevDeps, newDevDeps);
            prodDepsChanged = newProdDeps && !_.isEqual(oldProdDeps, newProdDeps);

            if (devDepsChanged || prodDepsChanged) {
                if (devDepsChanged) {
                    pjson.devDependencies = newDevDeps;
                }
                if (prodDepsChanged) {
                    pjson.dependencies = newProdDeps;
                }
                return promiseWriteFile(config.packageJson, JSON.stringify(pjson, null, 2) + '\n')
                    .catch(function (err) {
                        console.error(chalk.red('Couldn\'t write package.json\n'), err);
                    });
            }
        }
    }).catch(function (err) {
        console.error(chalk.red('Couldn\'t read installed modules\n'), err);
    });
};

function equalize(dependencies, prefix, modules) {
    var newDevDeps = _.clone(dependencies);
    var newVersion;
    var semver;

    _.forIn(newDevDeps, function (value, key) {
        newVersion = '';
        semver = value.match(/^(.*?)[0-9]+/);

        if (prefix) {
            newVersion += prefix;
        } else if (semver) {
            newVersion += semver[1];
        }
        newVersion += modules.dependencies[key].version;

        if (newDevDeps[key] === newVersion) {
            return;
        }
        console.info([
            '* ',
            chalk.bold(key),
            '@',
            chalk.green(value),
            ' to ',
            chalk.red(newVersion)
            ].join(''));

        newDevDeps[key] = newVersion;
    });

    return newDevDeps;
}
