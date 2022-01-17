function(req) {
    var bareUrl = req.url.substring(0, req.url.indexOf('?'));
    var provider = bareUrl.split('/')[2];
    if (provider === 'facebook') {
      // Request an access token
      var response = Meteor.http.get(
        "https://graph.facebook.com/oauth/access_token?" +
          "client_id=" + Meteor.accounts.facebook._appId +
          // XXX what does this redirect_uri even mean?
          "&redirect_uri=" + Meteor.accounts.facebook._appUrl + "/_oauth/facebook" +
          "&client_secret=" + Meteor.accounts.facebook._secret +
          "&code=" + req.query.code).content;

      // Extract the facebook access token from the response
      var fbAccessToken;
      _.each(response.split('&'), function(kvString) {
        var kvArray = kvString.split('=');
        if (kvArray[0] === 'access_token')
          fbAccessToken = kvArray[1];
        // XXX also parse the "expires" argument?
      });

      return fbAccessToken;
    } else {
      throw new Error("Unknown OAuth provider: " + provider);
    }
  }