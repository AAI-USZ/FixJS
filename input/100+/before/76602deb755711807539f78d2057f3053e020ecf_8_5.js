function(err, u) {

    if(err || !u) {
      req.flash('error',req.t('There was an error unlocking that user account.'));
      res.redirect('/user/list');
    }

    u.locked = false;
    calipso.e.pre_emit('USER_UNLOCK',u);
    u.save(function(err) {
      if(err) {
        req.flash('error',req.t('There was an error unlocking that user account.'));
      } else {
        calipso.e.post_emit('USER_UNLOCK',u);
        req.flash('info',req.t('Account unlocked.'));
      }
      res.redirect('/user/profile/' + username);
    });

  }