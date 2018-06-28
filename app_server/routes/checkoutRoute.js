var express = require('express');
var router = express.Router();
var checkoutCtrl = require('../controllers/checkoutCtrl');
var middleware = require('../middleware/userMiddleware');

router.get('/checkout', middleware.authentication, checkoutCtrl.getCheckoutPage);

router.post('/checkout/step1', middleware.authentication, checkoutCtrl.checkoutFirstStep);


module.exports = router;