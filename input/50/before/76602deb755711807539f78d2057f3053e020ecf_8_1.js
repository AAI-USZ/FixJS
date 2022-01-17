function(err) {
        // Check for error
        calipso.e.post_emit('USER_LOGOUT',u);
        if(res.statusCode != 302) {
          res.redirect('back');
        }
        next();

      }