var db = require('../../fn/db');
var interfaceDAO = require('./interfaceDAO').interfaceDAO;

exports.Type = function (type) {
  this.type = type;
};
exports.typeDAO = function() {
  interfaceDAO.call(this);
  this.nameTable = "_TYPE_CAR";
  this.col_id = "_type";
  this.add = function(newType) {
    sql = `insert into ${this.nameTable}(${this.col_id}) values(\"${newType.type}\")`;
    return db.save(sql);
  };
};