const gulp = require('gulp');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const pug = require('gulp-pug')


gulp.task('server', function () {
    connect.server({
        root: 'dist',
        livereload: true
    })
});

gulp.task('image', () =>
    gulp.src('./src/images/*')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
            svgoPlugins: [
                {
                    removeViewBox: true
                }
            ]
        }))
        .pipe(gulp.dest('./dist/images'))
        .pipe(connect.reload())
        
);
gulp.task('fonts', function () {
    gulp.src('./src/fonts/*')
    .pipe(gulp.dest('./dist/fonts'))
    .pipe(connect.reload())
});
gulp.task('pug', function () {
    gulp.src('./src/*.pug')
    .pipe(pug({
        pretty: true
      }))
      .on('error', function (err) {
        process.stderr.write(err.message + '\n');
        this.emit('end'); 
    })
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload())
});

gulp.task('js', function () {
    gulp.src('./src/js/**.js')
    .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload())
});

gulp.task('styles', function () {
    gulp.src('./src/sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload())
});

gulp.task('watch', function () {
    gulp.watch('./src/sass/**/*.sass', ['styles'])
    gulp.watch('./src/*.pug', ['pug'])
    gulp.watch('./src/js/**/*.js', ['js'])
})
gulp.task('default', ['watch', 'server']);
