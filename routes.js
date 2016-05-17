var express = require('express');
var router = express.Router();
var ce = require('./commandExecutor');
var config = require('./config');
var winston = require('./log.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    winston.info("Rendering downloader main page");
    res.render('index', {
        title: 'UNICEF monitoring station',
        moduleId: GLOBAL_CONFIG.moduleId,
        serverTime: new Date().getTime()
    });
});

/* GET closeSession. */
router.get('/closeSession', function (req, res, next) {
    winston.info("closing session");
    ce.shellExecutor(config.shellCommands.closeSession, function (error, stdout, stderr) {
        if (!error) {
            winston.info("closing session OK");
            res.send('closeSession: ' + stdout);
        } else {
            winston.error("closing session ERROR\n" + error + "\n" + stdout + "\n" + stderr);
            res.send('error ' + error);
        }
    });

});

var packagesPath = (process.env.MODULE_PACKAGES_DIR || "/tmp" );
/* GET downloadPackages. */
var serveIndex = require('serve-index');
router.use(express.static(__dirname + "/"));

router.use('/download', express.static(packagesPath));
router.use('/download', serveIndex(packagesPath, {
    'icons': true,
    'view': 'details',
    template: __dirname + "/views/download.template.html"
}));

/* GET syncTime. */
router.get('/syncTime', function (req, res, next) {
    ce.shellExecutor(config.shellCommands.syncTime + req.query.newTime,
        function (error, stdout, stderr) {
            if (!error) {
                winston.info("Time synchronized\n" + stdout, req.query);
                res.send('Time synchronized.');
            } else {
                winston.error("error time sync " + error + stderr + stdout);
                res.send('error ' + error);
            }
        });
});

/* GET syncTime. */
router.get('/execute', function (req, res, next) {
    ce.shellExecutor(req.query.command,
        function (error, stdout, stderr) {
            if (error) {
                winston.error("Error when executing command " + req.query.command + "\n" + error + stdout + stderr);
            }
            winston.info("Command executed successfully " + req.query.command + "\n" + stdout);
            res.send({stdout: stdout, stderr: stderr, error: error});
        });
});

/* GET hardwareStatus. */
router.get('/status', function (req, res, next) {
    winston.info("hardware status page");
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
