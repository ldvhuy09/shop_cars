var express = require('express');
var router = express.Router();
var checkoutCtrl = require('../controllers/checkoutCtrl');
var middleware = require('../middleware/userMiddleware');

router.get('/checkout', middleware.authentication,middleware.checkCart, checkoutCtrl.getCheckoutPage);

router.post('/checkout/step1', middleware.authentication, middleware.checkCart, checkoutCtrl.toFirstStep);

router.get('/checkout/finish', middleware.authentication, middleware.checkCart, checkoutCtrl.finishStep);


module.exports = router;