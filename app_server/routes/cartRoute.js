var express = require('express');
var router = express.Router();
var cartCtrl = require('../controllers/cartController');
var middleware = require('../middleware/userMiddleware');


router.get('/product/add-to-cart', middleware.authentication, cartCtrl.addToCart);

router.get('/cart', middleware.authentication, cartCtrl.getCartPage);

module.exports = router;

