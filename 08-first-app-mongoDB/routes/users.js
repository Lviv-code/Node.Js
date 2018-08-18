var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/next', function(req, res, next) {
  res.send('respond with a next resource');
});
module.exports = router;
