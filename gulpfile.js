const gulp = require('gulp'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	browserSync = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-cssmin');

gulp.task('sass', function(){
	return	gulp.src('app/sass/main.sass')
				.pipe(sass({outputStyle: 'expanded'}))
				.pipe(autoprefixer({
					overrideBrowserslist: ['last 8 versions']
				}))
				.pipe(concat('style.css'))
				.pipe(gulp.dest('dist/css/'))
				.pipe(browserSync.reload({stream: true}))
});

gulp.task('style', function(){
	return gulp.src([
		'node_modules/normalize.css/normalize.css'
	])
		.pipe(concat('libsmin.css'))
		.pipe(cssmin())
		.pipe(gulp.dest('dist/css'))
});



gulp.task('html', function(){
	return gulp.src('*.html')
		.pipe(browserSync.reload({streem: true}))
});

gulp.task('js', function(){
	return gulp.src('app/js/*.js')
		.pipe(browserSync.reload({streem: true}))
});

gulp.task('browser-sync', function(){
	browserSync.init({
		server: {
			baseDir: "../car-sharing"
		}
	});
});


gulp.task('watch', function(){
	gulp.watch('app/sass/*.sass', gulp.parallel('sass'))
	gulp.watch('*.html', gulp.parallel('html'))
	gulp.watch('app/js/*.js', gulp.parallel('js'))
});

gulp.task('default', gulp.parallel('style',  'sass', 'watch', 'browser-sync'))