var exec = require('child_process').exec;

var ce = {
    scriptExecutor: function (scriptName, callback) {
        console.log("Executing script: " + scriptName);
        exec('./scripts/' + scriptName, callback);
    },
    shellExecutor: function (scriptName, callback) {
        console.log("Executing shell command: " + scriptName);
        exec(scriptName, callback);
    }
}

module.exports = ce;
