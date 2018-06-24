var express = require('express');
var router = express.Router();
var ctrProduct = require('../controllers/productCtrl');

router.get('/product/detail-product', ctrProduct.detailProduct);
router.get('/product/catelogies', ctrProduct.productBy);
router.get('/product/allProduct', ctrProduct.allProduct);

module.exports = router;
