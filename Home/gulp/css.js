var gulp   = require('gulp')
var concatCss = require('gulp-concat-css');
var stylus = require('gulp-stylus')

gulp.task('default', function () {
  return gulp.src('css/app.css')
    .pipe(concatCss())
    .pipe(gulp.dest('assets'));
});

gulp.task('css', function () {
    return gulp.src('css/app.styl')
	    .pipe(stylus())
	    .pipe(gulp.dest('assets'))
})

gulp.task('watch:default', ['default'], function () {
  gulp.watch('css/**/*.css', ['default'])
})

gulp.task('watch:css', ['css'], function () {
  gulp.watch('css/**/*.styl', ['css'])
})