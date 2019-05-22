module.exports = function(gulp, options, config, wrapPipe) {

    var webServer = require('gulp-webserver');

    return gulp.task('webServer', wrapPipe(function (success, error) {
        gulp.src(config['public'])
            .pipe(webServer(options['server']));
    }));
};