function(err, oauth_access_token, oauth_access_token_secret, results) {
    var screenName = results.screen_name
      , profileImage;

    if (err) {
      return self.error();
    }

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
      session.avatar = res.headers.location;
      session.name = screenName;
      self.redirect('/battle');
    });
  }