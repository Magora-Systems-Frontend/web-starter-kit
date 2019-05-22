module.exports = function (gulp, options, config, wrapPipe) {
  const gIf = require('gulp-if');
  const sourcemaps = require('gulp-sourcemaps');
  const babel = require('gulp-babel');
  const concat = require('gulp-concat');
  const uglify = require('gulp-uglify');

  return gulp.task('javascript', wrapPipe(function (success, error) {
    return gulp.src(options['src'])
      .pipe(sourcemaps.init())
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(concat(options['dst']))
      .on('error', error)
      .pipe(sourcemaps.write('.'))
      .pipe(gIf(config.isProduction, uglify()))
      .on('error', error)
      .pipe(gulp.dest(config['public']))
  }));

};