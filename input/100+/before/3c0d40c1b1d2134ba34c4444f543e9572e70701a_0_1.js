function(err, user) {
        if (err) return self.error();

        // Function called at end of both new user and returning user codepaths
        var proceed = function(err, user) { 
          if (err) return self.error();
          
          session.userID = user._id;
          self.redirect('/battle');
        };

        // Returning user
        if (user._id) {

          // Account for changes to the user's screen name or avatar
          user.avatar = avatar;
          user.name = screenName;
          Users.save(user, proceed);

        // New user
        } else {
          Users.create({
            name: screenName
          , avatar: avatar
          , twitterID: twitterID

          }, proceed);
        }
      }