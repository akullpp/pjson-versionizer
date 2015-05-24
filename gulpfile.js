'use strict';

var $ = require('gulp-load-plugins')();
var gulp = require('gulp');

var config = require('./config');

gulp.task('default', ['eslint', 'test']);

gulp.task('dev', function () {
    gulp.watch([
        config.sourceFiles,
        config.testFiles
    ], ['test']);
});

gulp.task('eslint', function () {
    return gulp.src([
            config.sourceFiles,
            config.testFiles
        ])
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failOnError());
});

gulp.task('test', function () {
    return gulp.src(config.testFiles, {read: false})
        .pipe($.mocha());
});
