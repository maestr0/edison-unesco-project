var express = require('express');
var router = express.Router();

var exec = require('child_process').exec;

/* GET home page. */
router.get('/', function (req, res, next) {
    var status = "";
    var commands = [
        "date",
        "configure_edison --showWiFiIP",
        "configure_edison --showWiFiMode",
        "configure_edison --showNames",
        "hostnamectl",
        "df -h",
        "free -h"
    ].join('; echo "\n\n" && ');

    exec(commands, function (error, stdout, stderr) {
        if (!error) {
            status = stdout;
        } else {
            status = stdout + "\n\n" + stderr + "\n\n" + error;
        }

        res.render('index', {title: 'UNICEF monitoring station', moduleId: "AABBCCDDEEFF"});
    });
});

module.exports = router;
