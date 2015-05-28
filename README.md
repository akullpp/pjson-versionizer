# pjson-versionizer

[![Build Status](https://travis-ci.org/akullpp/pjson-versionizer.svg?branch=master)](https://travis-ci.org/akullpp/pjson-versionizer) [![npm stable version](https://img.shields.io/npm/v/pjson-versionizer.svg)](https://npmjs.org/package/pjson-versionizer)

Sets the versions of all dependencies in the `package.json` to match the versions of the installed dependencies located in the `node_modules`.

## Installation

`npm i -g pjson-versionizer`

## Usage

    pjv [options]

    Options:

      -h, --help         output usage information
      -V, --version      output the version number
      --ddeps            Only sets development dependencies
      --deps             Only sets production dependencies
      --prefix [semver]  Semver prefix for all dependencies
      --dry              Only logs to console

## Motivation

Use case for me were scenarios in which [npm-check-update](https://github.com/tjunnone/npm-check-updates) didn't work. For example if you were trying to update the `package.json` to replace all asterisks `*` with the actual version:

    dependencies: {
        "a": "*"
    }

becomes

    dependencies: {
       "a": "^1.0.0"
    }

Also it is useful to update the version to the latest installed made available by semver, e.g. `^1.0.0` to `^1.1.0`. Or to set the semver of all packages via the prefix flag.
