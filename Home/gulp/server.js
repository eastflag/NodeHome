var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('dev:server', function() {
	nodemon({
		script: 'server.app',
		ext: 'js',
		ignore: ['ng*', 'gulp*', 'assets*']
	})
})