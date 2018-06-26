
exports.authentication = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  req.flash('error', "Bạn cần đăng nhập để sử dụng chức năng này");
  res.redirect('/login');
};