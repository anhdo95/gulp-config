var { src, dest } = require('gulp')
    babel = require('gulp-babel'),
    rename = require('gulp-rename')

module.exports = function scriptsTask() {
  return src('app/js/**/*.js')
    .pipe(babel())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist/scripts'));
}