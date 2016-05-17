var exec = require('child_process').exec;
var winston = require('./log.js');

var ce = {
    scriptExecutor: function (scriptName, callback) {
        winston.info("Executing script: " + scriptName);
        exec('./scripts/' + scriptName, callback);
    },
    shellExecutor: function (scriptName, callback) {
        winston.info("Executing shell command: " + scriptName);
        exec(scriptName, callback);
    }
}

module.exports = ce;
