var express = require('express');
var router = express.Router();
var http = require("http");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'VRT TOKEN' });
});

module.exports = router;
