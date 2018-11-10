var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('this is /api');
});

router.get('/list', function(req, res, next) {
	res.send('this is /api/list')
})

module.exports = router;
