var db = require('../fn/db');
var async = require('async');

exports.interfaceDAO = function () {
  this.nameTable = null;
  this.col_id = null;
  this.getAll = function() {
    sql = `select * from ${this.nameTable}`;
    return db.load(sql);
  }
  this.getItems = function(limit=9, offset=0, sortBy=null, orderAZ=true) {
    if (sortBy === null) orderBy = this.col_id;
    order = 'ASC';
    if (!orderAZ) order = 'DESC';
    sqlLoadItem = `select * from ${this.nameTable} limit ${limit} offset ${offset}`;
    sqlCount = `select count(*) as countAll from ${this.nameTable}`;
    return new Promise((resolve, reject) => {
      async.parallel({
          items: function(callback) {
            db.load(sqlLoadItem).then(rows => {
              callback(null, rows);
            });
          },
          countAll: function(callback) {
            db.load(sqlCount).then(row=> {
              callback(null, row[0].countAll);
            });
          }
        }, (err, res) => {
          if (err) reject(err);
          resolve(res);
        }
      )
    });
  };
  this.getBy = function(col, val, limit=9, offset=0, sortBy=null, orderAZ=true) {
    if (sortBy === null) orderBy = this.col_id;
    order = 'ASC';
    if (!orderAZ) order = 'DESC';
    sqlLoadItem = `select * from ${this.nameTable} where ${col} = \"${val}\"  order by ${sortBy} ${order} limit ${limit} offset ${offset}`;
    sqlCount = `select count(*) as countAll from ${this.nameTable} where ${col} = \"${val}\"`;
    return new Promise((resolve, reject) => {
      async.parallel({
          items: function(callback) {
            db.load(sqlLoadItem).then(rows => {
              callback(null, rows);
            });
          },
          countAll: function(callback) {
            db.load(sqlCount).then(row=> {
              callback(null, row[0].countAll);
            });
          }
        }, (err, res) => {
          if (err !== null) reject(err);
          resolve(res);
        }
      )
    });
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
