var express = require('express');
var dbtable = require('../model/data_table').DbTable;
var async = require('async');

var router = express.Router();

var vm = {
  catelogies: {},
  listProduct: {},
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



// router.get('/', (req, res) => {
//   res.render('home/index', vm);
// });

router.get('/', (req, res) => {
  productCar.single(3).then (rows => {
    vm.product.detail = rows;
    type = vm.product.detail._type;
    brand = vm.product.detail._brand;
    async.parallel({
      sameType: function(callback) {
        productCar.loadLimit("_type", type, 6).then(rows => {
          callback(null, rows);
        });
      },
      sameBrand: function(callback) {
        productCar.loadLimit("_brand", brand, 6).then(rows => {
          callback(null, rows);
        });
      }
    }, function(err, result) {
      vm.product.sameType.first = result.sameType.slice(0, 3);
      vm.product.sameType.second = result.sameType.slice(3, 6);
      vm.product.sameBrand.first = result.sameBrand.slice(0, 3);
      vm.product.sameBrand.second = result.sameBrand.slice(3, 6);
    });  
    res.render('products/detailProductPage', vm);
  });
});

module.exports = router;