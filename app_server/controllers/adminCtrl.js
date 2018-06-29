var db = require('../fn/db');
var dbProduct = require('../model/ProductModel');
var dbTypeBrand = require('../model/MenuModel');
var dbOrder = require('../model/OrderModel');

exports.getAdminPage = (req, res) => {
  res.render('admin/index', {
    layout: 'admin'
  });
}

exports.getTransPage = (req, res) => {
  dbOrder.loadAllOrder().then(rows => {
    res.render('admin/trans', {
      layout: 'admin',
      orders: rows
    });
  })
};

exports.updateStateTrans = (req, res) => {
  oid = parseInt(req.query.oid);
  dbOrder.updateStateOrder(oid).then(nothing => {
    res.redirect('back');
  }).catch(err => {
    if (err) console(err);
  })
}

exports.deleteTrans = (req, res) => {
  oid = parseInt(req.query.oid);
  dbOrder.deleteOrder(oid).then(nothing => {
    res.redirect('back');
  }).catch(err => {
    if (err) console.log(err);
  });
}

exports.getDetailTrans = (req, res) => {
  oid = parseInt(req.query.oid);
  dbOrder.loadOrder(oid).then(order => {
    listProductObj = JSON.parse(order[0]._listProduct);
    order[0]._listProduct = toArray(listProductObj);
    // console.log(order[0]);
    res.render('admin/detailTrans', {
      layout: 'admin',
      order: order[0],
    });
  }).catch(err => {
    console.log(err);
  });
}

exports.getProductPage = (req, res) => {
  dbProduct.loadAll().then(rows => {
    res.render('admin/product', {
      products: rows,
      layout: 'admin'
    });
  }).catch(err => {
    if (err) console.log(err);
  });
};

var toArray = (obj) => {
  var arr = [];
  for (var id in obj.items) {
    arr.push(obj.items[id]);
  }
  return arr;
}
