const gulp = require('gulp'),
    compass = require('gulp-compass'),
    path = require('path');

gulp.task('styles', function() {
    gulp.src('*.scss')
        .pipe(compass({
            config_file: 'config.rb',
            css: 'css',
            sass: 'sass'
        }))
        .pipe(gulp.dest('temp'));
});

gulp.task('express', function() {
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')({port: 35729}));
    app.use(express.static(__dirname));
    app.listen(6555, '0.0.0.0');
});

function notifyLiveReload(event) {
    var fileName = path.relative(__dirname, event.path);

    tinylr.changed({
        body: {
            files: [fileName]
        }
    });
}

let tinylr;
gulp.task('livereload', function() {
    tinylr = require('tiny-lr')();
    tinylr.listen(35729);
});



gulp.task('watch', function() {
    gulp.watch('sass/*.scss', ['styles']);
    gulp.watch('*.html', notifyLiveReload);
    gulp.watch('css/*.css', notifyLiveReload);
});

gulp.task('default', ['styles', 'express', 'livereload', 'watch'], function() {

});