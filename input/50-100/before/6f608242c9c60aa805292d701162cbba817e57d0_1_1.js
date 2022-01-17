function(err, usercheck) {
    if (usercheck > 0) {
      console.log('user found, not creating a new one with the same name');
      req.flash('error', 'User already exists');
      res.redirect('back');
    } else {
      var values = {
        user: req.body.username
      , pass: bcrypt.hashSync(req.body.password, 8)
      };
      userdb.insert(values, function(err, post) {
        req.flash('New user added!')
        res.redirect('/');
      });
    }
  }