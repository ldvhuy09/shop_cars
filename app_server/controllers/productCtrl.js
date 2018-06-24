var loadContent = require('../model/loadContentPage');
var paginate = require('express-paginate');

exports.detailProduct = (req, res) => {
  loadContent.detailProductPage(parseInt(req.query.id), req.query.type, req.query.brand).then (result => {
    res.render('products/detailProductPage', result);
  });
};

exports.productBy = (req, res) => {
  pageCurrent = parseInt(req.query.page)
  limit = parseInt(req.query.limit);
  offset = (pageCurrent - 1) * limit;

  loadContent.productByPage(req.query.att,
                            req.query.val,
                            limit,
                            offset,
                            req.query.sortBy).then (result => {
    itemCount = result.listProduct.countAll;
    pageCount = Math.ceil(itemCount / limit);
    url = req.baseUrl + req.path;
    res.render('products/productPage', {
      menu: result.menu,
      listProduct: result.listProduct.items,
      url,
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
  loadContent.allProductPage(limit, offset, req.query.sortBy).then(result => {
    itemCount = result.listProduct.countAll;
    pageCount = Math.ceil(itemCount / limit);
    url = req.baseUrl + req.path;
    res.render('products/productPage', {
      menu: result.menu,
      listProduct: result.listProduct.items,
      url,
      itemCount,
      pageCount,
      pages: paginate.getArrayPages(req)(5, pageCount, pageCurrent)
    });
  });
}
