'use strict';

var _ = require('lodash'),
    chalk = require('chalk'),
    fs = require('fs'),
    path = require('path'),
    Q = require('q'),
    readInstalled = require('read-installed');


function versionize(dir, options) {
    var promiseReadFile = Q.nfbind(fs.readFile),
        promiseReadInstalled = Q.nfbind(readInstalled),
        promiseWriteFile = Q.nfbind(fs.writeFile),
        config = _.extend({
            dir: dir,
            packageJson: path.join(dir, 'package.json')
        }, options);

    return Q.all([
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
        if (!config.deps && pjson.devDependencies) {
            equalize(pjson.devDependencies, config.prefix, modules);
        }
        if (!config.ddeps && pjson.dependencies) {
            equalize(pjson.dependencies, config.prefix, modules);
        }

        if (!config.try) {
        return promiseWriteFile(config.packageJson, JSON.stringify(pjson, null, 2)).catch(function (err) {
            console.error(chalk.red('Couldn\'t write package.json\n'), err);
        });
        }
    }).catch(function (err) {
        console.error(chalk.red('Couldn\'t read installed modules\n'), err);
    });
}

function equalize(dependencies, prefix, modules) {
    _.forIn(dependencies, function (value, key) {
        var newVersion = '',
            semver = value.match(/^(.*?)[0-9]+/);

        if (prefix) {
            newVersion += prefix;
        }
        else {
            if (semver) {
                newVersion += semver[1];
            }
        }
        newVersion += modules.dependencies[key].version;

        console.info([
            '* ',
            chalk.bold(key),
            '@',
            chalk.green(value),
            ' to ',
            chalk.red(newVersion)
        ].join(''));

        dependencies[key] = newVersion;
    });
}

exports.versionize = versionize;
