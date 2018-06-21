var ProductDAO = require('./productDAO').ProductDAO;
var async = require('async');

var dataProduct = new ProductDAO();

exports.loadProduct = () => {
  return dataProduct.getAll();
};

exports.loadProductBy = (att, val) => {
  return new Promise((resolve, reject) => {
    dataProduct.getBy(att, val).then(rows => {
      resolve(rows);
    });
  });
}

exports.loadDetail = (id, type, brand) => {
  return new Promise((resolve, reject) => {
    async.parallel({
      detail: function(callback) {
        dataProduct.getSingle(id).then(rows => {
          callback(null, rows[0]);
        }).catch((err) => {
          reject(err);
        });
      },
      sameType: function(callback) {
        dataProduct.getBy("_type", type).then(rows => {
          callback(null, rows);
        }).catch((err) => {
          reject(err);
        });
      },
      sameBrand: function(callback) {
        dataProduct.getBy("_brand", brand).then(rows => {
          callback(null, rows);
        }).catch((err) => {
          reject(err);
        });
      }
    }, (err, result) => {
        if (err != null) reject(err);
        resolve(specifyProduct = {
          inforDetail: result.detail,
          sameType: {
            first: result.sameType.slice(0,3),
            second: result.sameType.slice(3, 6)
          },
          sameBrand: {
            first: result.sameBrand.slice(0, 3),
            second: result.sameBrand.slice(3,6)
          }
        });
    });
  });
};

