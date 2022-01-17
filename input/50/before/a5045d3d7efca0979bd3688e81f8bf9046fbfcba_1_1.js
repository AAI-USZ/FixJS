function(er, m) {
          if(er) return res.error(er);
          var locals = {
            content: 'login.ejs',
            profile: m.myprofile
          }

          res.template('layout.ejs', locals)
        }