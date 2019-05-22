var fs = require('fs');
try {
    var logo = fs.readFileSync('./logo', 'utf8');
    var bug = fs.readFileSync('./bug', 'utf8');
}
catch(e){
    logo = '';
    bug = '';
}

var defaultOptions = {
    default: {
        env: 'src',
        config: './config.json',
        server: 'localhost:8085',
        needSvg: true,
        IS_MAIN_PAGE: false,
        IS_ABOUT_PAGE: false,
        IS_WORK_PAGE: false,
        IS_CONTACT_PAGE: false
    }
};

//console parameters
var minimist = require('minimist');
var options = minimist(process.argv.slice(2), defaultOptions);

console.info('API HOST: ' + options.server);


var config = require(options.config);


switch (options['env']) {
    case 'production':
    {
        config.isProduction = true;
        console.log('Production build');
        break;
    }
    case 'src':
    {
        config.isProduction = false;
        console.log('Develop build');
        break;
    }
}

function wrapPipe(taskFn) {
    return function(done) {
        var onSuccess = function() {
            return done();
        };
        var onError = function(err) {
            if(bug) console.log(bug);
            console.log(err.toString());
            done(err);
        };
        var outStream = taskFn(onSuccess, onError);
        if(outStream && typeof outStream.on === 'function') {
            outStream.on('end', onSuccess);
        }
    }
}

var gulp = require('gulp');
var tasks = {};
var taskNames = Object.keys(config.tasks);
var taskFolder = './gulp';
for (var task_i=0; task_i < taskNames.length; task_i++){
    var _taskName = taskNames[task_i];
    tasks[_taskName] = require(taskFolder + '/' + _taskName + '.js');
    var parameters = config.tasks[_taskName];
    tasks[_taskName](gulp, parameters, config, wrapPipe);
}

if(config.watch === true){
    require(taskFolder + '/watch.js')(gulp, config.tasks)
}


gulp.task('default', ['build'], function () {
    gulp.start('watch');
    gulp.start('webServer');
    if(logo) console.log(logo);
});


