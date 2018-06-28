var userSession = require('../model/UserSession')

exports.authentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } 
  req.flash('error', "Bạn cần đăng nhập để sử dụng chức năng này");
  res.redirect('/login');
};

exports.checkSession = (req, res, next) => {
  if (req.isAuthenticated()) {
    uid = res.locals.user._userID;
    userSession.loadSessionDataForUser(uid).then(result => {
      if (result) {
        dataSession = JSON.parse(result.dataSession);
        userSession.updateDataSessionInSessionTable(req.session.id, JSON.stringify(dataSession)).then(result => {
          req.session.reload (function(err) {
            if (err) console.log(err);
            return next();
          });       
        });
      }
      else {
        console.log(JSON.stringify(req.session));
        userSession.addSessionDataForUser(uid, JSON.stringify(req.session)).then(result => {
          return next();   
        }).catch(err => {
          if (err) console.log(err);
        });
      }
    });
  } else return next();
}