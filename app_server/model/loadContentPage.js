var loadMenu = require('./loadMenu');
var loadProduct = require('./loadProduct');
var async = require('async');
var paginate = require('express-paginate');



exports.dataHomePage = (limit=12, offset=0, sortBy=null, orderAZ=true) => {
  return new Promise((resolve, reject) => {
    async.parallel({
      menu: function(callback) {
        loadMenu.loadMenuUser().then(_menu => {
          callback(null, _menu);
        });
      },
      listProduct: function(callback) {
        loadProduct.loadProduct(limit, offset, sortBy, orderAZ).then(res => {
          callback(null, res);
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

exports.productByPage = (att, val, limit=9, offset=0, sortBy=null, orderAZ=true) => {
  return new Promise((resolve, reject) => {
    async.parallel({
      menu: function(callback) {
        loadMenu.loadMenuUser().then(_menu => {
          callback(null, _menu);
        });
      },
      listProduct: function(callback) {
        loadProduct.loadProductBy(att, val, limit, offset, sortBy, orderAZ).then(res => {
          callback(null, res);
        });
      }
    }, (err, result) => {
      if (err !== null) reject(err);
      resolve(result);
    });
  });
};

exports.allProductPage = (limit=9, offset=0, sortBy=null, orderAZ=true) => {
  return new Promise((resolve, reject) => {
    async.parallel({
      menu: function(callback) {
        loadMenu.loadMenuUser().then(_menu => {
          callback(null, _menu);
        });
      },
      listProduct: function(callback) {
        loadProduct.loadProduct(limit, offset, sortBy, orderAZ).then(res => {
          callback(null, res);
        });
      }
    }, (err, result) => {
      if (err !== null) reject(err);
      resolve(result);
    });
  });
}
