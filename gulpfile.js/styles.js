var { src, dest } = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    rename = require('gulp-rename')

var browserSync = require('./browser-sync')

module.exports = function stylesTask() {
  return src(
      [
        'app/scss/**/*.scss',
        '!app/scss/**/_*.scss'
      ],
      {
        allowEmpty: true,
      }
    )
    .pipe(sass())
    .pipe(prefix())
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist/styles'))
}