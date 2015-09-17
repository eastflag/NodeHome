var gulp   = require('gulp')
var concat = require('gulp-concat');
var stylus = require('gulp-stylus')



gulp.task('css', function () {
    return gulp.src(['css/style.css', 'css/app.styl'])
	    .pipe(stylus())
	    .pipe(concat('app.css'))
	    .pipe(gulp.dest('assets'))
})


gulp.task('watch:css', ['css'], function () {
  gulp.watch('css/**.*', ['css'])
})