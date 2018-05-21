var express = require('express');
var dbtable = require('../model/type_brand').DbTable;

var router = express.Router();

var vm = {
  catelogies: {},
  product: null
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

productCar.loadAll().then(rows => {
  vm.product = rows;
});

router.get('/', (req, res) => {
  res.render('home/index', vm);
});

router.get('/product', (req, res) => {
  res.render('products/allproduct', vm);
});

module.exports = router;