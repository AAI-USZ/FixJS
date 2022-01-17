function(req, res, next) {
    console.log("PROFILE: ", req.user);
    res.render('profile', { user: JSON.stringify(req.user) });
  }