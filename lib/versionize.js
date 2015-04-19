'use strict';

var _ = require('lodash'),
    chalk = require('chalk'),
    fs = require('fs'),
    path = require('path'),
    Q = require('q'),
    readInstalled = require('read-installed');

function versionize(dir, options) {
    var packageJson = path.join(dir, 'package.json'),
        pjson, deps, ddeps,
        lsOptions = {
            dev: options.ddeps,
            depth: 0
        };

    if (!fs.existsSync(packageJson)) {
        throw new Error('No package.json in current working directory');
    }

    promiseReadFile(packageJson)
        .then(function (data) {
            pjson = JSON.parse(data);
            deps = options.ddeps ? _.noop() : pjson.dependencies;
            ddeps = options.deps ? _.noop() : pjson.devDependencies;

            if (!deps && !ddeps) {
                throw new Error('No dependencies or devDependencies found');
            }
            promiseReadInstalled(dir, lsOptions)
                .then(function (modules) {
                    if (!options.deps && ddeps) equalize(ddeps, options.prefix, modules);
                    if (!options.ddeps && deps) equalize(deps, options.prefix, modules);

                    promiseWriteFile(packageJson, JSON.stringify(pjson, null, 2))
                        .catch(function () {
                            console.error('Couldn\'t write package.json');
                            process.exit(1);
                        });
                })
                .catch(function () {
                    throw new Error('Couldn\'t find installed modules');
                });
        })
        .catch(function () {
            throw new Error('Couldn\'t read ' + packageJson);
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

function promiseReadFile(file) {
    return Q.nfbind(fs.readFile)(file, 'utf-8');
}

function promiseWriteFile(file, data) {
    return Q.nfbind(fs.writeFile)(file, data);
}

function promiseReadInstalled(wd, opt) {
    return Q.nfbind(readInstalled)(wd, opt);
}

exports.versionize = versionize;