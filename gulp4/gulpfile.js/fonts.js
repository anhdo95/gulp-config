var { src, dest } = require('gulp')

module.exports = function fontsTask() {
  return src('app/fonts/**/*')
    .pipe(dest('dist/fonts'))
}