var gulp = require('gulp');
var rseq = require('run-sequence');
var conn = require('gulp-connect');

gulp.task('default', () => {
    rseq(
        'build',
        'watch'
    );
});

gulp.task('build', (callback) => {
    rseq(
        'clean_dist',
        'vendor',
        'partialsJS',
        'partialsHTML',
        'partials',
        'scripts',
        'less',
        'fonts',
        'img',
        'html',
        'icons',
        'clean_tmp',
        callback
    );   
});

gulp.task('watch', () => {
    conn.server({
        root: './dist/',
        port: 4333,
        liveReload: true
    });
    gulp.watch([
        './source/js/app/**/*.js',
        './source/js/app/**/*.html',
        '!./source/js/app/templatecache/**/*.js',
        './source/less/**/*.less',
        './source/partials/**/*.html',
        './source/index.html'
    ], ['build']);
});