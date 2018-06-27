var express = require('express');
var router = express.Router();
var ctrHome = require('../controllers/homeCtrl');
var middleware = require('../middleware/userMiddleware')


router.get('/', function (req, res) {
  res.redirect('/home');
});

router.get('/loggedin', middleware.checkSession, function (req, res) {
  res.redirect('/home');
});

router.get('/home', ctrHome.index);

router.get('/contact-us', (req, res) => {
  res.render('contact/contact-us');
});


module.exports = router;
