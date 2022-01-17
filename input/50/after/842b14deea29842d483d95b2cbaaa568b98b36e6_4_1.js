function(err, user) { 
          if (err) return self.error();
         
          session.userID = user._id;
          self.redirect('/lobby');
        }