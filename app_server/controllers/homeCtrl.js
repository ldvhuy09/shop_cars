
var loadContent = require('../model/loadContentPage');

exports.index = function(req, res) {
  limit = 12;
  offset = 0;
  sortBy = req.query.sortBy ? req.query.sortBy : '_storeDate';
  order = req.query.order ? req.query.order : 'DESC';
  url = req.baseUrl + req.path ;
  console.log(req.originalUrl);
  loadContent.dataHomePage(limit, offset, sortBy, order).then(result => {
    res.render('home/index', {
      menu: result.menu,
      listProduct: result.listProduct.items,
      url
    });
  });
};
