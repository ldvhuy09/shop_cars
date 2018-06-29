var dbOrder = require('../model/OrderModel');
var dbSession = require('../model/UserSession');
var Cart = require('../model/CartModel');

var checkoutInforValid = (req) => {
  return new Promise ((resolve, reject) => {
    var error_return = null;
    req.checkBody('fullname', "Tên còn trống").notEmpty();
    req.checkBody('address', "Địa chỉ còn trống").notEmpty();
    req.checkBody('phone', "Số điện thoại còn trống").notEmpty();
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


exports.getCheckoutPage = (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  res.render("user/checkout", {
    items: cart.generateArray(),
    totalPrice: cart.totalPrice,
    totalQty: cart.totalQty
  });
};

exports.toFirstStep = (req, res) => {
  var receiverName = req.body.fullname;
  var receiverPhone = req.body.phone;
  var receiverAddress = req.body.address;
  checkoutInforValid(req).then(error_msg => {
    if (error_msg) {
      res.render('user/checkout', error_msg);
    }
    else {
      req.session.inforCheckout = {
        receiverName: receiverName,
        receiverPhone: receiverPhone,
        receiverAddress: receiverAddress 
      }
      var cart = new Cart(req.session.cart);
      res.render('user/reviewCheckout', {
        receiverName: receiverName,
        receiverPhone: receiverPhone,
        receiverAddress: receiverAddress,
        items: cart.generateArray(),
        totalQty: cart.totalQty,
        totalPrice: cart.totalPrice
      });
    }

  });
};

exports.finishStep = (req, res) => {
  var order = req.session.inforCheckout;
  order.listProduct = req.session.cart;
  var d = new Date();
  order.orderDate = "" + d.getFullYear() + "-" + (d.getMonth() + 1)  + "-" + d.getDate();
  order.totalPrice = req.session.cart.totalPrice;
  order.listProduct = JSON.stringify(req.session.cart);
  order.uid = req.user._userID;
  dbOrder.saveNewOrder(order).then(result => {
    req.flash('success_order', 'Đặt hàng thành công');
    delete req.session.cart;
    delete req.session.inforCheckout;
    dbSession.saveSessionDataForUser(order.uid, JSON.stringify(req.session)).then(result => {
      res.redirect('/');
    });
  }).catch(err => {
    if (err) {
      console.log(err);
      res.redirect('/');
    }
  });
}