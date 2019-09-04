var { dest } = require('gulp')
    rename = require('gulp-rename'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify')

module.exports = function scriptsTask() {
  return browserify({
    entries: ['app/js/main.js']
  })
  .transform(
    babelify, {
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-proposal-class-properties']
    }
  )
  .bundle()
  .pipe(source('main.js'))
  .pipe(rename({ extname: '.min.js' }))
  .pipe(buffer())
  .pipe(dest('app/js'))
  .pipe(rename('main.bundle.js'))
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(dest('dist/scripts'))
}