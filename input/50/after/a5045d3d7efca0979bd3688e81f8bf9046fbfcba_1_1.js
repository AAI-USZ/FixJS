function(er, m) {
          // error just means we're not logged in.
          var locals = {
            content: 'login.ejs',
            profile: m && m.myprofile
          }

          res.template('layout.ejs', locals)
        }