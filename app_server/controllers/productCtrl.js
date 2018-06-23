var loadContent = require('../model/loadContentPage');
var paginate = require('express-paginate');

exports.detailProduct = (req, res) => {
  loadContent.detailProductPage(parseInt(req.query.id), req.query.type, req.query.brand).then (vm => {
    console.log(vm);
    res.render('products/detailProductPage', vm);
  });
};

exports.productBy = (req, res) => {
  pageCurrent = parseInt(req.query.page)
  limit = parseInt(req.query.limit);
  offset = (pageCurrent - 1) * limit
  loadContent.productByPage(req.query.att,
                            req.query.val,
                            limit,
                            offset).then (result => {
    itemCount = result.listProduct.countAll;
    pageCount = Math.ceil(itemCount / limit);
    res.render('products/productPage', {
      menu: result.menu,
      listProduct: result.listProduct.items,
      itemCount,
      pageCount,
      pages: paginate.getArrayPages(req)(3, pageCount, pageCurrent)
    });
  });
};

exports.allProduct = (req, res) => {
  pageCurrent = parseInt(req.query.page)
  limit = parseInt(req.query.limit);
  offset = (pageCurrent - 1) * limit;
  loadContent.allProductPage(limit, offset).then(result => {
    itemCount = result.listProduct.countAll;
    pageCount = Math.ceil(itemCount / limit);
    res.render('products/productPage', {
      menu: result.menu,
      listProduct: result.listProduct.items,
      itemCount,
      pageCount,
      pages: paginate.getArrayPages(req)(5, pageCount, pageCurrent)
    });
  });
}
