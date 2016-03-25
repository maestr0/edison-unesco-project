var express = require('express');
var router = express.Router();
var ce = require('./commandExecutor');

var exec = require('child_process').exec;

/* GET home page. */
router.get('/', function (req, res, next) {
    var status = "";
    //var commands = [
    //    "date",
    //    "configure_edison --showWiFiIP",
    //    "configure_edison --showWiFiMode",
    //    "configure_edison --showNames",
    //    "hostnamectl",
    //    "df -h",
    //    "free -h"
    //].join('; echo "\n\n" && ');

    res.render('index', {
        title: 'UNICEF monitoring station',
        moduleId: GLOBAL_CONFIG.moduleId,
        serverTime: new Date().getTime()
    });
});

/* GET closeSession. */
router.get('/closeSession', function (req, res, next) {
    ce.scriptExecutor("closeSession.sh", function(error, stdout, stderr){
        if (!error) {
            res.send('closeSession');
        } else {
            res.send('error ' + error);
        }
    });

});

module.exports = router;
