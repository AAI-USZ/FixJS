function (err, user) {

        // Check if the user hash is ok, or if there is no hash (supports transition from password to hash)
        // TO BE REMOVED In later version
        if(user && calipso.lib.crypto.check(form.user.password,user.hash) || (user && user.hash === '')) {
          if(!user.locked) {
            found = true;
            calipso.e.post_emit('USER_LOGIN',user);
            createUserSession(req, res, user, function(err) {
              if(err) calipso.error("Error saving session: " + err);
            });
          }
        }

        if(!found) {
          req.flash('error',req.t('You may have entered an incorrect username or password, please try again.  If you still cant login after a number of tries your account may be locked, please contact the site administrator.'));
        }

        if(res.statusCode != 302) {
          res.redirect('back');
        }
        next();
        return;
      }