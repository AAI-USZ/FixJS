function(err) {

        if(err) {
          var msg = err.message;
          if (err.code === 11000) {
            msg = "a user has already registered with that email";
          }
          req.flash('error',req.t('Could not save user because {msg}.',{msg:msg}));
          if(res.statusCode != 302 && !res.noRedirect) {
            res.redirect('back');
            return;
          }
        } else {
          calipso.e.post_emit('USER_CREATE',u);
          if(!res.noRedirect) {
            req.flash('info',req.t('Profile created, you can now login using this account.'));
            res.redirect('/user/profile/' + u.username);
            return;
          }
        }

        // If not already redirecting, then redirect
        next(err);

      }