# pjson-versionizer

[![npm stable version](https://img.shields.io/npm/v/pjson-versionizer.svg)](https://npmjs.org/package/pjson-versionizer) 

Sets the versions of all dependencies in the `package.json` to match the versions of the installed dependencies located in the `node_modules`.

## Installation

`npm i -g pjson-versionizer`

## Usage

    pjv [options]

    Options:

        -h, --help             output usage information
        -V, --version          output the version number
        -p, --deps             Only sets production dependencies
        -d, --ddeps            Only sets development dependencies
        -s, --prefix [semver]  Semver prefix for all dependencies

## Motivation

Use case for me where scenarios where [npm-check-update](https://github.com/tjunnone/npm-check-updates) didn't work when trying to update the `package.json`, e.g. replacing all asterisks `*` with the actual version.

    dependencies: {
        "a": "*"
    }

becomes

    dependencies: {
       "a": "^1.0.0"
    }
