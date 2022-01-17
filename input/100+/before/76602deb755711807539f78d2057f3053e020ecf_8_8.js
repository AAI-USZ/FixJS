function(form) {
    if(form) {

      var username = req.moduleParams.username;
      var User = calipso.db.model('User');

      // Quickly check that the user is an admin or it is their account
       if(req.session.user && (req.session.user.isAdmin || req.session.user.username === username)) {
         // We're ok
       } else {
         req.flash('error',req.t('You are not authorised to perform that action.'));
         res.redirect('/');
         next();
         return;
       }

      // Get the password values and remove from form
      // This ensures they are never stored
      var new_password = form.user.new_password;
      delete form.user.new_password;
      var repeat_password = form.user.repeat_password;
      delete form.user.repeat_password;
      var old_password = form.user.old_password;
      delete form.user.old_password;

      User.findOne({username:username}, function(err, u) {

        u.fullname = form.user.fullname;
        u.username = form.user.username;
        u.email = form.user.email;
        u.language = form.user.language;
        u.about = form.user.about;
        u.showName = form.user.showName;
        u.showEmail = form.user.showEmail;

        // Update user roles and admin flag
        if(req.session.user && req.session.user.isAdmin) {
          var newRoles = [];
          u.isAdmin = false; // TO-DO Replace
          for (var role in form.user.roleList) {
            if(form.user.roleList[role]) {
              newRoles.push(role);
            }
          }
          u.roles = newRoles;
        }

        // Check to see if we are changing the password
        if(old_password) {

          // Check to see if old password is valid
          if(!calipso.lib.crypto.check(old_password,u.hash)) {
            if(u.hash != '') {
              req.flash('error',req.t('Your old password was invalid.'));
              res.redirect('back');
              return;
            }
          }

          // Check to see if new passwords match
          if(new_password != repeat_password) {
            req.flash('error',req.t('Your new passwords do not match.'));
            res.redirect('back');
            return;
          }

          // Check to see if new passwords are blank
          if(new_password === '') {
            req.flash('error',req.t('Your password cannot be blank.'));
            res.redirect('back');
            return;
          }

          // Create the hash
          u.hash = calipso.lib.crypto.hash(new_password,calipso.config.get('session:secret'));
          u.password = ''; // Temporary for migration to hash, remove later

        }

        if(err) {
          req.flash('error',req.t('Could not find user because {msg}.',{msg:err.message}));
          if(res.statusCode != 302) {
            res.redirect('/');
          }
          next();
          return;
        }

        calipso.e.pre_emit('USER_UPDATE',u);
        u.save(function(err) {
          if(err) {

            req.flash('error',req.t('Could not save user because {msg}.',{msg:err.message}));
            if(res.statusCode != 302) {
              // Redirect to old page
              res.redirect('/user/profile/' + username + '/edit');
            }

          } else {

            calipso.e.post_emit('USER_UPDATE',u);

            // Update session details if your account
            if(req.session.user && (req.session.user.username === username)) { // Allows for name change
              createUserSession(req, res, u, function(err) {
                if(err) calipso.error("Error saving session: " + err);
              });
            }

            // Redirect to new page
            res.redirect('/user/profile/' + u.username);

          }
          // If not already redirecting, then redirect
          next();
        });

      });
    }
  }