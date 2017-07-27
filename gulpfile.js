/// <binding BeforeBuild='default' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var deleteLines = require('gulp-delete-lines');

gulp.task('default', function () {
    gulp.src(['./bower_components/xtrareportsjs/js/dx-designer.js', './bower_components/xtrareportsjs/js/web-document-viewer.js'])
        .pipe(deleteLines({
            'filters': [
                /var DevExpress;/i
            ]
        }))
        .pipe(gulp.dest('./bower_components/xtrareportsjs/js'));
});