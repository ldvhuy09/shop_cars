var db = require('../fn/db');
var interfaceDAO = require('./interfaceDAO').interfaceDAO;

exports.Product = function (id, name, type, brand, origin, viewed, price, link) {
  this.id = id; 
  this.name = name;
  this.type = type;
  this.brand = brand;
  this.origin = origin;
  this.viewed = viewed;
  this.price = price;
  this.link = link;
};
exports.ProductDAO = function() {
  interfaceDAO.call(this);
  this.nameTable = "_PRODUCT";
  this.col_id = "_productID";
  this.add = function(newProduct) {
    sql = `insert into ${this.nameTable}(${this.col_id}, _name, _type, _brand, _origin, _viewed, _price, _link) values(\"${newProduct.id}\", \"${newProduct.name}\", \"${newProduct.type}\", \"${newProduct.brand}\", \"${newProduct.origin}\", ${newProduct.viewed}, ${newProduct.price}, \"${newProduct.link}\")`;
    return db.save(sql);
  };
  this.update = function(product) {
    sql = `update ${this.nameTable} set _name = \"${product.name}\",  _type = \"${product.type}\",  _brand = \"${product.brand}\",  _origin = \"${product.origin}\",  _viewed = ${product.viewed},  _price = ${product.price},  _link = \"${product.link}\" where ${this.col_id} = \"${product.id}\"`
    return db.save(sql);
  }
};