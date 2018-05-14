var express = require('express');
var menu = require('../model/type_brand');

var router = express.Router();

var vm = {}
menu.TypeCar.loadAll().then(rows => {
  vm._type = rows;
});


router.get('/', (req, res) => {
  res.render('home/index', vm);
});

router.get('/product', (req, res) => {
  menu.TypeCar.loadAll().then(rows => {
    var vm = {
      _type: rows
    };
    res.render('products/allproduct', vm);
  })
});

module.exports = router;