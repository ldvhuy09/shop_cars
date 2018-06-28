var db = require('../fn/db');
var ProductDAO = require('./DAO/productDAO').ProductDAO;
var async = require('async');

var dataProduct = new ProductDAO();

/* load all product and count*/
exports.loadProduct = (limit=9, offset=0, sortBy='_storeDate', order='DESC') => {
  return new Promise((resolve, reject) => {
    dataProduct.getItems(limit, offset, sortBy, order).then(vm => {
      resolve(vm);
    }).catch(err => {
      reject(err);
    });
  });
};

/* load product by specify attribute*/
exports.loadProductBy = (att, val, limit=9, offset=0, sortBy='_storeDate', order='DESC') => {
  return new Promise((resolve, reject) => {
    dataProduct.getBy(att, val, limit, offset, sortBy, order).then(result => {
      resolve(result);
    }).catch(err => {
      reject(err);
    });
  });
}


/*load detail product*/
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
        dataProduct.getBy("_type", type).then(res => {
          callback(null, res.items);
        }).catch((err) => {
          reject(err);
        });
      },
      sameBrand: function(callback) {
        dataProduct.getBy("_brand", brand).then(res => {
          callback(null, res.items);
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

exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    dataProduct.getSingle(id).then(result => {
      resolve(result[0]);
    }).catch(err => {
      reject(err);
    })
  })
}

exports.updateView = (pid) => {
  return new Promise ((resolve, reject) => {
    sqlLoadViews = `select _viewed from _PRODUCT where _productID = ${pid}`;
    db.load(sqlLoadViews).then(result => {
      console.log(result);
      views = parseInt(result[0]._viewed);
      views++;
      sqlUpdateViews = `update _PRODUCT set _viewed = ${views} where _productID = ${pid}`;
      db.save(sqlUpdateViews).then(nothing => {
        resolve();
      }).catch(err => {
        if (err) reject(err);
      });
    }).catch(err => {
      if (err) reject(err);
    });
  });  
};