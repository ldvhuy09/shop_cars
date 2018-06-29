var express = require('express');
var router = express.Router();
var adminCtrl = require('../controllers/adminCtrl');
var middleware = require('../middleware/userMiddleware');

router.get('/admin', middleware.authentication, middleware.isAdmin, adminCtrl.getAdminPage);
router.get('/admin/trans', middleware.authentication, middleware.isAdmin, adminCtrl.getTransPage);
router.get('/admin/trans/update', middleware.authentication, middleware.isAdmin, adminCtrl.updateStateTrans);
router.get('/admin/trans/delete', middleware.authentication, middleware.isAdmin, adminCtrl.deleteTrans);
router.get('/admin/trans/detail', middleware.authentication, middleware.isAdmin, adminCtrl.getDetailTrans);
router.get('/admin/product', middleware.authentication, middleware.isAdmin, adminCtrl.getProductPage);

module.exports = router