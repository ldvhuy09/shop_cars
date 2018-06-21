var loadMenu = require('./loadMenu');
var loadProduct = require('./loadProduct');
var async = require('async');



exports.dataHomePage = () => {
  return new Promise((resolve, reject) => {
    async.parallel({
      menu: function(callback) {
        loadMenu.loadMenuUser().then(_menu => {
          callback(null, _menu);
        });
      },
      listProduct: function(callback) {
        loadProduct.loadProduct().then(list => {
          callback(null, list);
        });
      }
    }, (err, result) => {
      if (err != null) reject(err);
      resolve(result);
    });
  });
};

exports.detailProductPage = (id, type, brand) => {
  return new Promise((resolve, reject) => {
    async.parallel({
      menu: function(callback) {
        loadMenu.loadMenuUser().then(_menu => {
          callback(null, _menu);
        });
      },
      specifyProduct: function(callback) {
        loadProduct.loadDetail(id, type, brand).then(_detail => {
          callback(null, _detail);
        });
      }      
    }, (err, result) => {
      resolve(result);
      if (err != null) reject(err);
    });
  });
};

exports.productByPage = (att, val) => {
  return new Promise((resolve, reject) => {
    async.parallel({
      menu: function(callback) {
        loadMenu.loadMenuUser().then(_menu => {
          callback(null, _menu);
        });
      },
      listProduct: function(callback) {
        loadProduct.loadProductBy(att, val).then(rows => {
          callback(null, rows);
        });
      }      
    }, (err, result) => {
      resolve(result);
      if (err != null) reject(err);
    });
  });
}