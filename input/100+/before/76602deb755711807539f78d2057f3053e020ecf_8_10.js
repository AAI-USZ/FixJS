function logoutUser(req, res, template, block, next) {

  if(req.session && req.session.user) {

    var User = calipso.db.model('User');

    User.findOne({username:req.session.user.username}, function(err, u) {

      req.session.user = null;
      req.session.save(function(err) {
        // Check for error
        calipso.e.post_emit('USER_LOGOUT',u);
        if(res.statusCode != 302) {
          res.redirect('back');
        }
        next();

      });

    });

  } else {
    // Fail quietly
    res.redirect('back');
    next();
  }

}