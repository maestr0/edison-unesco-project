var express = require('express');
var router = express.Router();

var exec = require('child_process').exec;

/* GET home page. */
router.get('/', function (req, res, next) {
    var status = "ss";
    exec("hostnamectl", function (error, stdout, stderr) {
        if (!error) {
            status = stdout;
        } else {
            status = "Error: " + stderr + error;
        }

        res.render('index', {title: 'UNESCO monitoring station', status: status});
    });
});

module.exports = router;
