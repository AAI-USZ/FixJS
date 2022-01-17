function(err, oauth_access_token, oauth_access_token_secret, results) {
      if (err) {
        console.log(err);
        return self.error();
      }

    var screenName = results.screen_name
      , twitterID = results.user_id
      , profileImage;

    oauth.access_token = oauth_access_token;
    oauth.access_token_secret = oauth_access_token_secret;

    // Now that the user has authenticated, query twitter for the username,
    // profile picture, and profile URL
    profileImage = {
      host: 'api.twitter.com'
    , port: 80
    , path: '/1/users/profile_image?' + querystring.stringify({
        screen_name: screenName
      , size: 'bigger'
      })
    };

    // Once the response is received, store the data in the session and 
    // redirect to the battle page
    http.get(profileImage, function(res) {
      var avatar = res.headers.location;

      // Check if this user is new or returning
      Users.get({twitterID: twitterID}, function(err, user) {
        if (err) return self.error();

        // Function called at end of both new user and returning user codepaths
        var proceed = function(err, user) { 
          if (err) return self.error();
         
          session.userID = user._id;
          self.redirect('/lobby');
        };

        // Returning user
        if (user._id) {

          // Account for changes to the user's screen name or avatar
          user.avatar = avatar;
          user.name = screenName;
          user.save(function(err) {
            proceed(err, user);
          });

        // New user
        } else {

          Users.create({
            name: screenName
          , avatar: avatar
          , twitterID: twitterID

          }, proceed);
        }
      });
    });
  }