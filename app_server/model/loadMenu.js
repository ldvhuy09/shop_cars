var dbtable = require('./dataTable').DbTable;
var async = require('async');

var menuUser = {
  catelogies: {
    type: null,
    brand: null
  },
  shopCart: null
};


var menuAdmin = {};

var typeCar = new dbtable("_TYPE_CAR", "_type", "_type");
var brandCar = new dbtable("_BRAND_CAR", "_brand", "_brand");

exports.loadMenuUser = () => {
  return new Promise((resolve, reject) => {
    var menu = {
      catelogies: {},
      shopCart: {}      
    };
    typeCar.loadAll().then(rows=> {
      menu.catelogies.type = rows;
    }).catch((error)=> {
      reject(error);
    });
    brandCar.loadAll().then (rows => {
      menu.catelogies.brand = rows;
    }).catch((error) => {
      reject(error);
    });
    resolve(menu);
  });
  // async.parallel({
  //   catelogies: {
  //     type: function(callback) {
  //       typeCar.loadAll().then (rows => {
  //         callback(null, rows);
  //       });
  //     },
  //     brand: function(callback) {
  //       brandCar.loadAll().then(rows => {
  //         callback(null, rows);
  //       });
  //     }
  //   },
  // }, (err, result) => {
  //   console.log(result);
  //   return result;
  // });
};
