var db = require('../../fn/db');
var interfaceDAO = require('./interfaceDAO').interfaceDAO;

exports.User = function (uid, pwd, name, email) {
  this.uid = uid;
  this.pwd = pwd;
  this.name = name;
  this.email = email;
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
    sql = `update ${this.nameTable} set _password = \"${user.pwd}\", _fullname = \"${user.fullname}\", _email = \"${user.email}\" where ${this.col_id} = \"${user.uid}\"`;
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
