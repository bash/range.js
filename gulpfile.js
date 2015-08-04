/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */
var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    babel = require('gulp-babel');

var source = gulp.src('src/**/*.js'),
    browserTarget = gulp.dest('dist/browser'),
    nodeTarget = gulp.dest('dist/node');

var b = browserify({
    global: false,
    transform: ['babelify', 'uglifyify' ]
});

/**
 * TASK: build
 */
gulp.task('build', function () {
    source.pipe(b).pipe(browserTarget);
    source.pipe(babel()).pipe(nodeTarget);
});

/**
 * TASK: watch
 */
gulp.task('watch', function () {
    gulp.watch('src/**/*.js', function(){
        console.log('Building...');
        source.pipe(babel()).pipe(nodeTarget);
        source.pipe(b).pipe(browserTarget);
    });
});