var db = require('../fn/db');

exports.loadOrderOfUser = (uid) => {
  sql = `select * from _ORDER where _userID = \"${uid}\";`
  return db.load(sql);
};

exports.loadSummaryOrder = (uid) => {
  sql = `select _orderID, _orderDate, _receiverName, _totalPrice, _state from _ORDER where _userID = \'${uid}\' order by _orderDate DESC`;
  return db.load(sql);
}

exports.loadOrder = (oid) => {
  sql = `select * from _ORDER where _orderID = \'${oid}\'`;
  return db.load(sql);
}

exports.saveNewOrder = (order) => {
  sql = `insert into _ORDER value(NULL, \'${order.uid}\', 0, \'${order.receiverName}\', \'${order.receiverAddress}\', \'${order.receiverPhone}\', \'${order.orderDate}\', ${order.totalPrice}, \'${order.listProduct}\');`;
  return db.save(sql);
};
