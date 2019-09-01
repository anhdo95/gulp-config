var { src, dest, series, parallel } = require('gulp'),
    cache = require('gulp-cache'),
    del = require('del'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    minifyCss = require('gulp-cssnano'),
    uglify = require('gulp-uglify')

var settings = {
  clean: true,
  cache: false,
}

var paths = {
  output: 'dist'
}

var styles = require('./styles')
var scripts = require('./scripts')
var images = require('./images')
var fonts = require('./fonts')
var watch = require('./watch')

function clearCache(done) {
  if (settings.cache) {
    return cache.clear()
  }

  return done()
}

function cleanDist(done) {
  if (settings.clean) {
    del.sync([
      paths.output
    ])
  }

  return done()
}

function publish() {
  return src('app/*.html')
    .pipe(useref())
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulpif('*.js', uglify()))
    .pipe(dest('dist'))
}

module.exports.clearCache = clearCache
module.exports.cleanDist = cleanDist
module.exports.images = images
module.exports.fonts = fonts
module.exports.styles = styles
module.exports.scripts = scripts
module.exports.watch = watch

module.exports.default = series(
  parallel(cleanDist, clearCache),
  parallel(images, fonts, styles, scripts),
  publish
)


