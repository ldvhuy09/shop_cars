var loadContent = require('../model/loadContentPage');

exports.detailProduct = (req, res) => {
  loadContent.detailProductPage(parseInt(req.params.id), req.params.type, req.params.brand).then (vm => {
    console.log(vm);
    res.render('products/detailProductPage', vm);
  });
};

exports.productBy = (req, res) => {
  loadContent.productByPage(req.params.att, req.params.val).then (vm => {
    res.render('products/productPage', vm);
  });
};


