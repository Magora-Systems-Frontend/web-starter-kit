module.exports = function(gulp, options, config, wrapPipe) {
    var data = require("gulp-data");
    var pug = require('gulp-pug'),
        gIf = require('gulp-if'),
        htmlmin = require('gulp-htmlmin'),
        concat = require('gulp-concat');

    return gulp.task('pug', wrapPipe(function (success, error) {

        return gulp.src(options['pages'])
            .pipe(data(function() {
                return {
                    options: options,
                    config: config,
                    IS_MAIN_PAGE: config.IS_MAIN_PAGE,
                    IS_ABOUT_PAGE: config.IS_ABOUT_PAGE,
                    IS_WORK_PAGE: config.IS_WORK_PAGE,
                    IS_CONTACT_PAGE: config.IS_CONTACT_PAGE
                }
            }))
            .pipe(pug({pretty: true}))
            .on('error', error)

            .pipe(gIf(config.isProduction, htmlmin({collapseWhitespace: true})))
            .on('error', error)

            .pipe(gulp.dest(config['public']));
    }));
};