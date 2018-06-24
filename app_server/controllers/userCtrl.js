var dbUser = require('../model/User');
var User = require('../model/DAO/userDAO').User

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

exports.getLoginPage = (req, res) => {
  res.render('login/login');
};

exports.signup = (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var uid = req.body.username;
  var pwd = req.body.password;
  var pwd2 = req.body.password2;

  signupValid(req).then(errors => {
    if (errors) {
      res.render('login/login', errors);
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
  req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/');
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