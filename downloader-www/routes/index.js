var express = require('express');
var router = express.Router();

var exec = require('child_process').exec;

/* GET home page. */
router.get('/', function (req, res, next) {
    var status = "ss";
    exec("hostnamectl ; echo -e \"\n\n\" && df -h && echo -e \"\n\n\" && free", function (error, stdout, stderr) {
        if (!error) {
            status = stdout;
        } else {
            status = stderr + "\n\n" + error;
        }

        res.render('index', {title: 'UNICEF monitoring station', status: status});
    });
});

module.exports = router;
