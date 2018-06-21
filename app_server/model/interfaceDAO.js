var db = require('../fn/db');

exports.interfaceDAO = function () {
  this.nameTable = null;
  this.col_id = null;
  this.getAll = function() {
    sql = `select * from ${this.nameTable}`;
    return db.load(sql);
  };
  this.getBy = function(col, val) {
    sql = `select * from ${this.nameTable} where ${col} = \"${val}\"`;
    return db.load(sql);
  }
  this.getSingle = function(id) {
    sql = `select * from ${this.nameTable} where ${this.col_id} = \"${id}\"`;
    return db.load(sql);
  };
  this.add = function(obj) {

  };
  this.update = function(obj) {

  };
  this.delete = function(id) {
    sql = `delete from ${this.nameTable} where ${this.col_id} = \"${id}\"`;
    return db.save(sql);
  };
}
