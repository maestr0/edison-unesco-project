var exec = require('child_process').exec;

var ce = {
    scriptExecutor: function (scriptName, callback) {
        exec('./scripts/' + scriptName, callback);
    }
}

module.exports = ce;
