var express = require('express');
var router = express.Router();
var ctrHome = require('../controllers/homeCtrl');
var ctrProduct = require('../controllers/productCtrl');

router.get('/', function (req, res) {
  res.redirect('/home');
});
router.get('/home', ctrHome.index);
// router.get('/product', ctrProduct.index);
router.get('/product/detail-product/:id/:brand/:type', ctrProduct.detailProduct);
router.get('/product/catelogies/:att/:val', ctrProduct.productBy);
router.get('/contact-us', (req, res) => {
  res.render('contact/contact-us');
});

module.exports = router;