var exec = require('child_process').exec;

var ce = {
    scriptExecutor: function (scriptName, callback) {
        exec('./scripts/' + scriptName, callback);
    },
    shellExecutor: function (scriptName, callback) {
        exec(scriptName, callback);
    }
}

module.exports = ce;
