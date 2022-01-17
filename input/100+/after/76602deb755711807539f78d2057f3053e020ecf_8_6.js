function(err) {
          if(err) {

            req.flash('error',req.t('Could not save user because {msg}.',{msg:err.message}));
            if(res.statusCode != 302) {
              // Redirect to old page
              res.redirect('/user/profile/' + username + '/edit');
              return;
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
            return;

          }
          // If not already redirecting, then redirect
          next();
        }