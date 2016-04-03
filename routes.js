var express = require('express');
var router = express.Router();
var ce = require('./commandExecutor');
var config = require('./config');
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
    ce.scriptExecutor(config.scripts.closeSession, function (error, stdout, stderr) {
        if (!error) {
            res.send('closeSession: ' + stdout);
        } else {
            res.send('error ' + error);
        }
    });

});

/* GET downloadPackages. */
router.get('/downloadPackages', function (req, res, next) {
    res.render('download', {
        title: 'UNICEF monitoring station - Download',
        packages: ["file1.zip", "file2.zip", "file3.zip"]
    });
});

/* GET syncTime. */
router.get('/syncTime', function (req, res, next) {
    ce.scriptExecutor(config.scripts.syncTime + req.query.newTime,
        function (error, stdout, stderr) {
            if (!error) {
                res.send('Time synchronized.');
            } else {
                res.send('error ' + error);
            }
        });
});

var checkMotionSensorStatus = function () {
    return "OK";
}
var checkTouchSensorStatus = function () {
    return "OK";
}

/* GET hardwareStatus. */
router.get('/hardwareStatus', function (req, res, next) {
    res.render('hardwareStatus', {
        title: 'UNICEF monitoring station - hardwareStatus',
        camera: "OK",
        voltage: "3.2V",
        storage: "30% free, 21GB free",
        motion: "OK",
        touch: "OK"
    });
});

module.exports = router;
