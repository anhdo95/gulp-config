var { watch } = require('gulp')

var stylesTask = require('./styles'),
    scriptsTask = require('./scripts'),
    browserSync = require('./browser-sync')

function startServer() {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  })
}

function watchTask() {
  startServer()

  watch(
    [
      'app/scss/**/*.scss',
      '!app/scss/**/_*.scss'
    ],
    {
      ignoreInitial: false,
      events: 'change',
      queue: false,
    },
    stylesTask
  )

  watch('app/*.html').on('change', browserSync.reload)
  watch(
    [
      'app/js/**/*.js',
      '!app/js/**/*.min.js'
    ],
    scriptsTask
  )
  .on('change', browserSync.reload)
}

module.exports = watchTask