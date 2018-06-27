var Cart = require('../model/Cart');
var dbProduct = require('../model/loadProduct');

exports.addToCart = (req, res) => {
  var productId = parseInt(req.query.pid);
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  dbProduct.findById(productId).then(result => {
    cart.add(result, productId);
    req.session.cart = cart;
    res.redirect('/');
  }).catch(err => {
    console.log(err);
    res.redirect('/');
  });
};

exports.getCartPage = (req, res) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  res.render('user/cart', {
    items: cart.generateArray(),
    totalPrice: cart.totalPrice,
    totalQty: cart.totalQty
  });
};