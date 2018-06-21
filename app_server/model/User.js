var UserDAO = require('./userDAO').userDAO;
var bcrypt = require('bcryptjs');

var dbUser = new UserDAO();
exports.createUser = function(newUser) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.pwd, salt, function(err, hash) {
      console.log(hash);
      newUser.pwd = hash;
      dbUser.add(newUser);
    });
  });
};

exports.getUserByUsername = function(username) {
  return new Promise((resolve, reject) => {
    dbUser.getSingle(username).then(rows => {
      resolve(rows[0]);
    }).catch(err => {
      reject(err);
    });
  });
};

exports.findByID = function(id, callback) {
  dbUser.findByID(id, callback);
}

exports.comparePwd = function(candidatePwd, hash) {
  return bcrypt.compareSync(candidatePwd, hash);
};