function(err, user) {
        if (err) return self.error();

        // Function called at end of both new user and returning user codepaths
        var proceed = function(err, user) { 
          if (err) return self.error();
         
          console.log('--*', user);

          session.userID = user._id;
          self.redirect('/battle');
        };

        // Returning user
        if (user._id) {

          console.log('returning user!', user);

          // Account for changes to the user's screen name or avatar
          user.avatar = avatar;
          user.name = screenName;
          user.save(function(err) {
            proceed(err, user);
          });

        // New user
        } else {

          console.log('new user!')

          Users.create({
            name: screenName
          , avatar: avatar
          , twitterID: twitterID

          }, proceed);
        }
      }