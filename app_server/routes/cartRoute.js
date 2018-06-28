var express = require('express');
var router = express.Router();
var cartCtrl = require('../controllers/cartController');
var middleware = require('../middleware/userMiddleware');


router.get('/cart/add-to-cart', middleware.authentication, cartCtrl.addToCart);

router.get('/product/add-to-cart', middleware.authentication, cartCtrl.addToCart);

router.get('/product/detail-product/add-to-cart', middleware.authentication, cartCtrl.addToCart);

router.get('/cart/delete-from-cart', middleware.authentication, cartCtrl.deleteFromCart);

router.get('/cart', middleware.authentication, middleware.checkCart, cartCtrl.getCartPage);

module.exports = router;

