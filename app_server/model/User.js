var UserDAO = require('./DAO/userDAO').userDAO;
var bcrypt = require('bcryptjs');

var dbUser = new UserDAO();
exports.createUser = function(newUser) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.pwd, salt, function(err, hash) {
        newUser.pwd = hash;
        dbUser.add(newUser).then(result => {
          resolve();
        })
        .catch(err => {reject(err);});
      });
    });
  })
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

exports.updateProfile = function(user) {
  return new Promise((resolve, reject) => {
    dbUser.update(user).then(rows => {
      resolve();
    }).catch(err => {
      reject(err);
    });
  });
};

exports.changePassword = function(uid, pwd) {
  return new Promise((resolve, reject) => {
    dbUser.updatePassword(uid, pwd).then(rows => {
      resolve();
    }).catch(err => {
      reject(err);
    });
  });
};

exports.comparePwd = function(candidatePwd, hash) {
  return bcrypt.compareSync(candidatePwd, hash);
};