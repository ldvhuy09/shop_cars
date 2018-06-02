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

//Phan nay se chuyen sang router ve user sau 
router.get('/login', (req, res) => {
  res.render('login/login');
});

var signupValid = (req) => {
  return new Promise((resolve, reject) => {
    var error_return = null;
    req.checkBody('name', "Tên còn trống").notEmpty();
    req.checkBody('email', "Email còn trống").notEmpty();
    req.checkBody('username', "Tên tài khoản trống").notEmpty();
    req.checkBody('password', "Mật khẩu trống").notEmpty();
    req.checkBody('password2', "Mật khẩu xác nhận không trùng khớp").equals(req.body.password);
    validErrors = req.validationErrors();
    if (validErrors) {
      error_return = {};
      validErrors.forEach(item => {
        error_return[item.param] = item.msg;
      });
    }

    resolve(error_return);
  });
};
router.post('/signup', (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  a = {};

  signupValid(req).then(errors => {
    if (errors) {
      console.log(errors);
      res.render('login/login', errors);
    }
    else {
      SÁNG MAI CODE CHỖ NÀY NHÉ, TỨC TẠO USER MỚI CHO NGƯỜI DÙNG;
      SAU ĐÓ HOÀN THÀNH XONG PHẦN NÀY NHÉ
      
      console.log('everything is smooth');
    }
  });

});
router.post('/login', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  console.log(username);
});


module.exports = router;