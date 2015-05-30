var express = require('express');
var router = express.Router();

router.use(express.static(__dirname + '/../assets'));
router.use('/templates', express.static(__dirname + '/../templates'))

router.get('/board.html', function(req, res) {
    res.sendfile('layout/board.html');
});

router.get('/admin.html', function(req, res) {
    res.sendfile('layout/admin/index.html');
});

module.exports = router;