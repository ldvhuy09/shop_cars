var db = require('../../fn/db');
var interfaceDAO = require('./interfaceDAO').interfaceDAO;

exports.User = function (uid, pwd, name, email, phone=null, address=null) {
  this.uid = uid;
  this.pwd = pwd;
  this.name = name;
  this.email = email;
  this.phone = phone;
  this.address = address;
};
exports.userDAO = function() {
  interfaceDAO.call(this);
  this.nameTable = "_USER";
  this.col_id = "_userID";
  this.add = function(newUser) {
    sql = `insert into _USER(_userID, _password, _fullname, _email) values(\"${newUser.uid}\", \"${newUser.pwd}\", \"${newUser.name}\", \"${newUser.email}\")`;
    return db.save(sql);
  };
  this.update = function(user) {
    sql = `update ${this.nameTable} set _fullname = \"${user.name}\", _email = \"${user.email}\", _phone = \"${user.phone}\", _address = \"${user.address}\" where ${this.col_id} = \"${user.uid}\"`;
    return db.save(sql);
  };
  this.updatePassword = function(uid, pwd) {
    sql = `update ${this.nameTable} set _password = \"${pwd}\" where ${this.col_id} = \"${uid}\"`;
    return db.save(sql);
  };
  this.findByID = function(id, callback) {
    sql = sql = `select * from ${this.nameTable} where ${this.col_id} = \"${id}\"`;
    db.load(sql).then(rows => {
      callback(null, rows[0]);
    }).catch(err => {
      callback(err, null);
    })
  }
};
