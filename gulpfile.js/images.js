var { src, dest } = require('gulp')
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin')

module.exports = function images() {
  return src('app/images/**/*.+(png|jpg|gif|svg)')
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
    .pipe(dest('dist/images'))
}