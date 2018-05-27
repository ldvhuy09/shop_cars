var data = require('../model/loadData');

exports.detailProduct = (req, res) => {
  data.detailProductPage(parseInt(req.params.id), req.params.type, req.params.brand).then (vm => {
    res.render('products/detailProductPage', vm);
  });
};

exports.productBy = (req, res) => {
  data.productByPage(req.params.att, req.params.val).then (vm => {
    res.render('products/productPage', vm);
  });
};


