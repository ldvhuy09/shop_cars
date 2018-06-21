var db = require('../fn/db');
var interfaceDAO = require('./interfaceDAO').interfaceDAO;

exports.Brand = function (brand) {
  this.brand = brand;
};
exports.brandDAO = function() {
  interfaceDAO.call(this);
  this.nameTable = "_BRAND_CAR";
  this.col_id = "_brand";
  this.add = function(newBrand) {
    sql = `insert into ${this.nameTable}(${this.col_id}) values(\"${newBrand.brand}\")`;
    return db.save(sql);
  };
};