# pjson-versionizer

[![npm stable version](https://img.shields.io/npm/v/pjson-versionizer.svg)](https://npmjs.org/package/pjson-versionizer) 

Sets the versions of all dependencies in the `package.json` to match the versions of the installed dependencies located in the `node_modules`.

## Installation

`npm i -g pjson-versionizer`

## Usage

    pjv [options]

    Options:

        -h, --help             Output usage information
        -V, --version          Output the version number
        -t, --try              Only logs to console
        -p, --deps             Only sets production dependencies
        -d, --ddeps            Only sets development dependencies
        -s, --prefix [semver]  Semver prefix for all dependencies

## Motivation

Use case for me were scenarios in which [npm-check-update](https://github.com/tjunnone/npm-check-updates) didn't work. For example if you were trying to update the `package.json` to replace all asterisks `*` with the actual version:

    dependencies: {
        "a": "*"
    }

becomes

    dependencies: {
       "a": "^1.0.0"
    }

Also it is useful to update the version to the latest made available by semver, e.g. `^1.0.0` to `^1.1.0`.