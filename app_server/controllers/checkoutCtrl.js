var dbOrder = require('../model/OrderModel');
var Cart = require('../model/Cart');

exports.getCheckoutPage = (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  res.render("user/checkout", {
    items: cart.generateArray(),
    totalPrice: cart.totalPrice,
    totalQty: cart.totalQty
  });
};

exports.checkoutFirstStep = (req, res) => {

};