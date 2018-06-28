var Cart = require('../model/Cart');
var dbProduct = require('../model/loadProduct');

exports.addToCart = (req, res) => {
  var pid = req.query.pid;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  dbProduct.findById(pid).then(result => {
    cart.add(result, pid);
    req.session.cart = cart;
    res.redirect('back');
  }).catch(err => {
    console.log(err);
    res.redirect('/');
  });
};

exports.deleteFromCart = (req, res) => {
  var pid = req.query.pid;
  var qty = parseInt(req.query.qty);
  if (qty > 0) {
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.delete(pid, qty);
    req.session.cart = cart;
  }
  res.redirect('back');
}

exports.getCartPage = (req, res) => {
  cart = new Cart(req.session.cart);
  res.render('user/cart', {
    items: cart.generateArray(),
    totalPrice: cart.totalPrice,
    totalQty: cart.totalQty
  });
};