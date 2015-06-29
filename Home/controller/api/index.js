var router = require('express').Router();

router.use(require('./board'));
router.use(require('./comment'));
router.use(require('./noboard'));
router.use(require('./posts'));
router.use(require('./user'));
router.use('/lol/', require('./lol'));

module.exports = router