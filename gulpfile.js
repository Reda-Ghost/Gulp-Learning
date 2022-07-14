const gulp = require('gulp');
const concat = require('gulp-concat');
const prefix = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const notify = require('gulp-notify');
const zip = require('gulp-zip');

// copy file in folder dist
gulp.task('copy', function () {
	return gulp.src('project/*.css').pipe(gulp.dest('dist'));
});

// compress HtML file in folder dist
gulp.task('compress', function () {
	return gulp
		.src('project/pug/index.pug')
		.pipe(pug({ pretty: true }))
		.pipe(concat('compressed.html'))
		.pipe(gulp.dest('dist'))
		.pipe(notify('Compression Done!'));
});

// concat file in one file
gulp.task('concat', function () {
	return gulp
		.src(['project/about.css', 'project/footer.css'])
		.pipe(concat('style.css'))
		.pipe(gulp.dest('dist'));
});

// auto prefix
gulp.task('prefix', function () {
	return gulp
		.src('project/about.css')
		.pipe(prefix('last 2 versions'))
		.pipe(gulp.dest('dist'));
});

// compile sass files
gulp.task('sass', function () {
	return gulp
		.src('project/scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix('last 2 versions'))
		.pipe(concat('style.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist'))
		.pipe(notify('Compile Sass Done!'));
});

// compile sass files and compress it
gulp.task('mini', function () {
	return gulp
		.src('project/scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
		.pipe(prefix('last 2 versions'))
		.pipe(concat('style.min.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist'))
		.pipe(notify('Compile Sass and Minify Done!'));
});

// compile pug files
gulp.task('html', function () {
	return gulp
		.src('project/pug/index.pug')
		.pipe(sourcemaps.init())
		.pipe(pug({ pretty: true }))
		.pipe(concat('pug.html'))
		.pipe(gulp.dest('dist'))
		.pipe(notify('Compile Pug Done!'));
});

// watch files for changes
gulp.task('watch', function () {
	gulp.watch('project/pug/**/*.pug', gulp.series('compress'));
	gulp.watch('project/scss/**/*.scss', gulp.series('mini'));
});

// minify js files
gulp.task('uglify', function () {
	gulp
		.src(['project/js/main.js', '!project/js/src.js'])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'))
		.pipe(notify('Uglify JS File Done!'));
});

// compress to zip
gulp.task('zip', function () {
	gulp
		.src('dist/**/*.*')
		.pipe(zip('learning.zip'))
		.pipe(gulp.dest('dist/compressed/'))
		.pipe(notify('Compression Done!'));
});

// upload file with ftp
gulp.task('deploy', function () {
	var conn = ftp.create({
		host: 'mywebsite.tld',
		user: 'me',
		password: 'mypass',
		parallel: 10,
		log: gutil.log,
	});

	var globs = ['src/**', 'css/**', 'js/**', 'fonts/**', 'index.html'];

	return gulp
		.src(globs, { base: '.', buffer: false })
		.pipe(conn.newer('/public_html')) // only upload newer files
		.pipe(conn.dest('/public_html'));
});

// default Task
gulp.task('default', gulp.parallel('zip', 'uglify'));
