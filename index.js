var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var config = require('./config');
var exec = require('child_process').exec;

var app = express();

GLOBAL_CONFIG = {moduleId: "dev-12:12:32:11:33:AB"};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.set('port', (process.env.DOWNLOADER_PORT || 3000));

app.listen(app.get('port'), function () {
    console.log('Module configurator UI listening on port 3000!');
    console.log("config loaded: " + JSON.stringify(config));
    getModuleId();
});

var getModuleId = function () {
    exec(config.shellCommands.moduleId, function (error, stdout, stderr) {
        if (!error) {
            GLOBAL_CONFIG['moduleId'] = stdout;
        } else {
            GLOBAL_CONFIG['moduleId'] = "Unknown ID";
        }
    });
}