var dbUser = require('../model/UserModel');
var User = require('../model/DAO/userDAO').User;
var bcrypt = require('bcryptjs');
var userSession = require('../model/UserSession');
var dbOrder = require('../model/OrderModel');

var toArray = (obj) => {
  var arr = [];
  for (var id in obj.items) {
    arr.push(obj.items[id]);
  }
  return arr;
}

var signupValid = (req) => {
  return new Promise((resolve, reject) => {
    var error_return = null;
    req.checkBody('name', "Tên còn trống").notEmpty();
    req.checkBody('email', "Email còn trống").notEmpty();
    req.checkBody('username', "Tên tài khoản trống").notEmpty();
    req.checkBody('password', "Mật khẩu trống").notEmpty();
    req.checkBody('password2', "Mật khẩu xác nhận không trùng khớp").equals(req.body.password);
    validErrors = req.validationErrors();
    if (validErrors) {
      error_return = {};
      validErrors.forEach(item => {
        error_return[item.param] = item.msg;
      });
    }
     resolve(error_return);
  });
};

var updateProfileValid = (req) => {
  return new Promise ((resolve, reject) => {
    var error_return = null;
    req.checkBody('fullname', "Tên còn trống").notEmpty();
    req.checkBody('email', "Email còn trống").notEmpty();
    req.checkBody('phone', "Số điện thoại còn trống").notEmpty();
    validErrors = req.validationErrors();
    if (validErrors) {
      error_return = {};
      validErrors.forEach(item => {
        error_return[item.param] = item.msg;
      });
    }
    resolve(error_return);
  });
};

var changePasswordValid = (req) => {
  return new Promise((resolve, reject) => {
    var error_return = null;
    req.checkBody('oldPass', "Cần nhập lại mật khẩu cũ").notEmpty();
    req.checkBody('newPass', "Cần nhập mật khẩu mới").notEmpty();
    req.checkBody('confirmPass', "Cần xác nhận mật khẩu").notEmpty();
    req.checkBody('confirmPass', "Mật khẩu xác nhận không trùng khớp").equals(req.body.newPass);
    validErrors = req.validationErrors();
    if (validErrors) {
      error_return = {};
      validErrors.forEach(item => {
        error_return[item.param] = item.msg;
      });
    }
    resolve(error_return);
  });
};

exports.getLoginPage = (req, res) => {
  res.render('user/login');
};

exports.signup = (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var uid = req.body.username;
  var pwd = req.body.password;
  var pwd2 = req.body.password2;

  signupValid(req).then(errors => {
    if (errors) {
      res.render('user/login', errors);
    }
    else {
      dbUser.createUser(new User(uid, pwd, name, email)).then(result => {
        req.flash("signup_success", "Đăng kí thành công!!! Bây giờ bạn có thể đăng nhập.");
        res.redirect('/login');
      });      
    }
  });
};

exports.login = (req, res) => {
  res.redirect('/');
}

exports.logout = (req, res) => {
  userSession.saveSessionDataForUser(req.user._userID, JSON.stringify(req.session)).then(result => {
    req.logout();
    req.session.destroy(function(err) {
      if (err) console.log(err);
      res.redirect('/');
    });
  }).catch(err => {
    if (err){
      console.log(err);
    }
    res.redirect('/');
  })
}

exports.getProfilePage = (req, res) => {
  dbUser.getUserByUsername(req.query.uid).then(result => {
    res.render('user/profile', {
      user: result
    });
  });
};

exports.getHistoryTransPage = (req, res) => {
  uid = req.user._userID;
  dbOrder.loadSummaryOrder(uid).then(rows => {
    res.render('user/histran', {
      listTrans: rows
    })
  }).catch(err => {
    console.log(err);
  });
};

exports.getDetailHisTran = (req, res) => {
  oid = req.params.oid;
  dbOrder.loadOrder(oid).then(order => {
    listProductObj = JSON.parse(order[0]._listProduct);
    order[0]._listProduct = toArray(listProductObj);
    // console.log(order[0]);
    res.render('user/detailTrans', order[0]);
  }).catch(err => {
    console.log(err);
  });
};

exports.updateProfile = (req, res) => {
  var fullname = req.body.fullname;
  var email = req.body.email;
  var uid = req.query.uid;
  var dob = req.body.bod;
  var phone = req.body.phone;
  var address = req.body.address;

  updateProfileValid(req).then(errors => {
    if (errors) {
      res.render('user/profile', errors);
    }
    else {
      dbUser.updateProfile(new User(uid, null, fullname, email, phone, address)).then(row => {
        req.flash('update_success', "Cập nhật tài khoảng thành công");
        res.redirect('/profile?uid='+uid);
      });
    }
  });
};

exports.changePassword = (req, res) => {
  var oldPass = req.body.oldPass;
  var newPass = req.body.newPass;
  var confirmPass = req.body.confirmPass;
  var uid = req.query.uid;

  changePasswordValid(req).then(errors => {
    if (errors) {
      res.render('user/profile', errors);
    }
    else {
      dbUser.getUserByUsername(uid).then(result => {
        if (dbUser.comparePwd(oldPass, result._password)) {
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newPass, salt, function(err, hash) {
              dbUser.changePassword(uid, hash)                   .then(result => {
                req.flash('change_pass_success', "Thay đổi mật khẩu thành công");
                res.redirect('/profile?uid='+uid);
              })
              .catch(err => {console.log(err);});
            });
          });
        } else {
          res.render('user/profile', {
            oldPass: "Mật khẩu cũ không chính xác"
          });
        }
      });
    }
  })
}

exports.localStragegy = (username, pwd, done) => {
  dbUser.getUserByUsername(username).then(user => {
    if (!user) {
      return done(null, false, {message: 'Tên đăng nhập không đúng.'});
    }
    else if (!dbUser.comparePwd(pwd, user._password))
      return done(null, false, {message: 'Mật khẩu không chính xác'});
    else return done(null, user);
  }).catch (err=> {
    throw err;
  });
};

exports.serializeUser = (user, done) => {
  done(null, user._userID);
};

exports.deserializeUser = (id, done) => {
  dbUser.findByID(id, (err, user) => {
    done(err, user);
  });
};