const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');
const browsersync = require('browser-sync');
const imagemin = require('gulp-imagemin');
const gutil = require( 'gulp-util' );
const ftp = require( 'vinyl-ftp' );
const ftpconfig = require('./config');
const replace = require('gulp-replace');
const gulpSequence = require('gulp-sequence')
//Pug
const pug = require('gulp-pug')
//Data
const data = require('./data')

gulp.task('pug', () => {
	return gulp.src('./src/**/*.pug')
		.pipe(pug({
			locals: data.locals,
			pretty: true
		}))
		.pipe(gulp.dest('./dist'))
		.pipe(browsersync.stream())
});

gulp.task('js', () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/js'))
        .pipe(browsersync.stream())
});

gulp.task('css', () => {
    return gulp.src('./src/sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(autoprefixer())
        .pipe(cleanCss())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browsersync.stream())
});

gulp.task('html', () => {
    return gulp.src('./src/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(browsersync.stream())

});

gulp.task('php', () => {
    return gulp.src('./src/**/*.php')
    .pipe(gulp.dest('./dist'))
    .pipe(browsersync.stream())
});

gulp.task('img', () => {
    return gulp.src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'))
});

gulp.task('sync', () => {
    browsersync.init({
        proxy: 'resto',
        notify: false
    })
});

gulp.task('build', ['pug', 'html', 'css', 'js', 'php', 'img']);

gulp.task('watch', () => {
    gulp.watch(['./src/sass/*.scss'], ['css']);
    gulp.watch(['./src/js/**/*.js'], ['js']);
    gulp.watch(['./src/**/*.html'], ['html']);
	gulp.watch(['./src/**/*.php'], ['php']);
	gulp.watch(['./src/**/*.pug'], ['pug']);
    gulp.watch(['./**/*.php',
                './**/*.html',
                './**/*.css',
				'./**/*.js',
				'./**/*.pug'
                ]).on('change', browsersync.reload);
});

gulp.task('default', ['sync', 'watch']);

gulp.task( 'deploy', function () {  
    const conn = ftp.create( {
        host:     ftpconfig.host,
        user:     ftpconfig.user,
        password: ftpconfig.password,
        parallel: 3,
        log:      gutil.log
    } );

    const globs = [
        './dist/**'
    ]; 

    return gulp.src( globs, { base: './dist', buffer: false } )
        .pipe(conn.newer('/public_html/portfolio/resto' )) 
        .pipe(conn.dest('/public_html/portfolio/resto' ));   
});
