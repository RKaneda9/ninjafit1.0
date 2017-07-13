var gulp     = require('gulp');
var annotate = require('gulp-ng-annotate');
var uglify   = require('gulp-uglify');
var concat   = require('gulp-concat'); 
var jshint   = require('gulp-jshint');
var cache    = require('gulp-angular-templatecache');
var merge    = require('gulp-merge');
var inject   = require('gulp-inject');

var dependencies = ['./lib/angular/angular.js', './lib/angular/angular-ui-router.js'];
var contentFiles = ['./app/app.js', './app/constants.js', './app/*/**/*.js'];
var templates    = 'app/**/*.html';
var bootstrapper = './app/main.js';

gulp.task('default', function () {
	return merge(

			gulp.src(dependencies)
				.pipe(concat('dependencies')),

			gulp.src(contentFiles)
				.pipe(jshint())
				.pipe(jshint.reporter('default'))
				.pipe(annotate())
				.pipe(concat('app-contents')),

			gulp.src(templates)
				.pipe(cache({ module: 'app', root: 'app' }))
				.pipe(concat('app-templates')),

			gulp.src(bootstrapper)
				.pipe(jshint())
				.pipe(jshint.reporter('default'))
				.pipe(annotate())
				.pipe(concat('app-bootstrapper'))
		)
		.pipe(concat('public/app.js'))
		.pipe(gulp.dest('compiled'))
		.pipe(uglify())
		.pipe(gulp.dest(''));
});

gulp.task('package', function () {
	var target = gulp.src('./test/index.html');
	var source = gulp.src([
		'./lib/angular/angular.js', 
		'./lib/angular/angular-ui-router.js',
		'./app/app.js', 
		'./app/constants.js', 
		'./app/*/**/*.js',
		'./app/main.js'
	]);

	return target
		.pipe(inject(source))
		.pipe(gulp.dest('./test'));
});