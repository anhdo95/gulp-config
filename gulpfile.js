var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    gulpIf = require('gulp-if'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del'),
    runSequence = require('run-sequence')

//#region development process
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true,
    }))
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  })
})

gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('app/scss/**/*.scss', ['sass'])

  gulp.watch('app/*.html', browserSync.reload)
  gulp.watch('app/js/**/*.js', browserSync.reload)
})
//#endregion

//#region optimization process
gulp.task('useref', function () {
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a javascript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

// copy fonts over from 'app' to 'dist'
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})

gulp.task('images', function() {
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      optimizationLevel: 5,
      svgoPlugins: [
        {
            removeViewBox: true
        }
      ]
    })))
    .pipe(gulp.dest('dist/images'))
})
//#endregion

//#region Destroying process
gulp.task('cache:clear', function(callback) {
  return cache.clear(callback)
})

gulp.task('clean:dist', function() {
  return del.sync('dist')
})
//#endregion

gulp.task('default', function(callback) {
  return runSequence('clean:dist',
    ['sass', 'useref', 'images', 'fonts'],
    callback
  )
})


