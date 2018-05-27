var dbtable = require('./dataTable').DbTable;
var async = require('async');

var productCar = new dbtable("_PRODUCT", "_productID", "_name");

exports.loadProduct = () => {
  return productCar.loadAll();
};

exports.loadProductBy = (att, val) => {
  return new Promise((resolve, reject) => {
    productCar.loadBy(att, val).then(rows => {
      resolve(rows);
    });
  });
}

exports.loadDetail = (id, type, brand) => {
  return new Promise((resolve, reject) => {
    async.parallel({
      detail: function(callback) {
        productCar.single(id).then(rows => {
          callback(null, rows);
        }).catch((err) => {
          reject(err);
        });
      },
      sameType: function(callback) {
        productCar.loadBy("_type", type).then(rows => {
          console.log(rows);
          callback(null, rows);
        }).catch((err) => {
          reject(err);
        });
      },
      sameBrand: function(callback) {
        productCar.loadBy("_brand", brand).then(rows => {
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

