function requireLogin(req, res, next) {
  if (!req.url.match(/login/) && !req.user) {
    req.flash("info", "please login");
    res.redirect('/login');
  }
  else {
    next();
  }
}