function(err, user) { 
          if (err) return self.error();
         
          console.log('--*', user);

          session.userID = user._id;
          self.redirect('/battle');
        }