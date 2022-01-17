function(err) {

        if(err) {
          req.flash('error',req.t('Could not save user because {msg}.',{msg:err.message}));
          if(res.statusCode != 302 && !res.noRedirect) {
            res.redirect('back');
          }
        } else {
          calipso.e.post_emit('USER_CREATE',u);
          if(!res.noRedirect) {
            req.flash('info',req.t('Profile created, you can now login using this account.'));
            res.redirect('/user/profile/' + u.username);
          }
        }

        // If not already redirecting, then redirect
        next(err);

      }