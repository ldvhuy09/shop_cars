var db = require('../fn/db');

exports.loadOrderOfUser = (uid) => {
  sql = `select * from _ORDER where _userID = \"${uid}\";`
  db.load(sql);
};

exports.loadSummaryOrder = (uid) => {
  sql = `select _orderID, _orderDate, _receiverName, _totalPrice, _state from _ORDER where _userID = ${uid}`;
  db.load(sql);
}

exports.saveNewOrder = () => {
  sql = `insert into _ORDER value(NULL, \'${uid}\', 0, \'${receiverName}\', \'${receiverAddress}\', \'${_phone}\', ${oderDate}, ${totalPrice}, '${listProduct}');`;
  return db.save(sql);
};
