var express = require('express');
var router = express.Router();
var paginate = require('express-paginate');
var dbProduct = require('../model/loadProduct');

//router.get('/product', async (req, res, next) => {

  // This example assumes you've previously defined `Users`
  // as `const Users = sequelize.define('Users',{})` if you are using `Sequelize`
  // and that you are using Node v7.6.0+ which has async/await support

  router.get("/allProduct", (req, res, next) => {
    dbProduct.findAndCountAll(req.query.limit, req.skip)
      .then(results => {
        const itemCount = results.count;
        const pageCount = Math.ceil(results.count / req.query.limit);
        console.log(results.rows);
        res.render('products/productPage', {
          listProduct: results.rows,
          pageCount,
          itemCount,
          pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
        });
    }).catch(err => next(err))
  });

//});

module.exports = router;
