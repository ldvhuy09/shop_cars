var express = require('express');
var dbtable = require('../model/data_table').DbTable;
var async = require('async');

var router = express.Router();

var vm = {
  catelogies: {},
  listProduct: null,
  product: {
    detail: null,
    sameType: {
      first: null,
      second: null
    },
    sameBrand: {
      first: null,
      second: null
    }
  }
};

var typeCar = new dbtable("_TYPE_CAR", "_type", "_type");
var brandCar = new dbtable("_BRAND_CAR", "_brand", "_brand");
var productCar = new dbtable("_PRODUCT", "_productID", "_name");

typeCar.loadAll().then(rows => {
  vm.catelogies.type = rows;
});

brandCar.loadAll().then(rows => {
  vm.catelogies.brand = rows;
});

router.get('/', (req, res) => {
  // if (vm.listProduct != null) 
  //   res.render('/home/index', vm);
  // else {
  //   productCar.loadAll().then (rows => {
  //     vm.listProduct = rows;
  //     res.render('/home/index', vm);
  //   });
  // }
  productCar.loadAll().then (rows => {
    vm.listProduct = rows;
    res.render('home/index', vm);
  });
});
router.get('/product', (req, res) => {
  res.redirect('/product/all');
});
router.get('/product/all', (req, res) => {
  productCar.loadAll().then (rows => {
    vm.listProduct = rows;
    res.render('allProductPage', vm);
  });
});

router.get('/detail-product/:_productId', (req, res) => {
  var _productId = parseInt(req.params._productId, 10);
  productCar.single(_productId).then (rows => {
    vm.product.detail = rows;
    async.parallel({
      sameType: function(callback) {
        productCar.loadLimit("_type", rows._type, 6).then(rows => {
          vm.product.sameType.first = rows.slice(0, 3);
          vm.product.sameType.second = rows.slice(3, 6);
          callback(null, rows);
        });
      },
      sameBrand: function(callback) {
        productCar.loadLimit("_brand", rows._brand, 6).then(rows => {
          vm.product.sameBrand.first = rows.slice(0, 3);
          vm.product.sameBrand.second = rows.slice(3, 6);
          callback(null, rows);
        });
      }
    }, function(err, result) {
      res.render('products/detailProductPage', vm);
    });  
  });
});

module.exports = router;