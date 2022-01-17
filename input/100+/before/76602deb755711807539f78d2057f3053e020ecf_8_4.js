function(err, u) {

    if(err || !u) {
      req.flash('error',req.t('There was an error unlocking that user account.'));
      res.redirect('/user/list');
    }

    u.locked = true;
    calipso.e.pre_emit('USER_LOCK',u);
    u.save(function(err) {
      if(err) {
        req.flash('error',req.t('There was an error unlocking that user account.'));
      } else {
        calipso.e.post_emit('USER_LOCK',u);
        req.flash('info',req.t('Account locked.'));
      }
      res.redirect('/user/profile/' + username);
    });

  }