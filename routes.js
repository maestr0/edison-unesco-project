var express = require('express');
var router = express.Router();
var ce = require('./commandExecutor');
var config = require('./config');
var exec = require('child_process').exec;

/* GET home page. */
router.get('/', function (req, res, next) {
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

var packagesPath = (process.env.MODULE_PACKAGES_DIR || "/tmp" );
/* GET downloadPackages. */
var serveIndex = require('serve-index');
router.use(express.static(__dirname + "/"));

router.use('/download', express.static(packagesPath));
router.use('/download', serveIndex(packagesPath, {'icons': true, 'view': 'details', template: __dirname + "/views/download.template.html"}));

/* GET syncTime. */
router.get('/syncTime', function (req, res, next) {
    ce.shellExecutor(config.shellCommands.syncTime + req.query.newTime,
        function (error, stdout, stderr) {
            if (!error) {
                res.send('Time synchronized.');
            } else {
                console.error(error);
                res.send('error ' + error);
            }
        });
});

/* GET syncTime. */
router.get('/execute', function (req, res, next) {
    ce.shellExecutor(req.query.command,
        function (error, stdout, stderr) {
            if (error) {
                console.error(error);
            }
            res.send({stdout: stdout, stderr: stderr, error: error});
        });
});

/* GET hardwareStatus. */
router.get('/status', function (req, res, next) {
    res.render('hardwareStatus', {
        title: 'UNICEF monitoring station - hardwareStatus',
        camera: "N/A",
        voltage: "N/A",
        storage: "N/A",
        motion: "N/A",
        touch: "N/A"
    });
});

module.exports = router;
