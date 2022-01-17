function(req) {
    var bareUrl = req.url.substring(0, req.url.indexOf('?'));
    var provider = bareUrl.split('/')[2];
    if (provider === 'facebook') {
      if (req.query.error) {
        // Either the user didn't authorize access or we cancelled
        // this outstanding login request (such as when the user
        // closes the login popup window)
        return null;
      }

      // Request an access token
      var response = Meteor.http.get(
        "https://graph.facebook.com/oauth/access_token?" +
          "client_id=" + Meteor.accounts.facebook._appId +
          "&redirect_uri=" + Meteor.accounts.facebook._appUrl + "/_oauth/facebook?close" +
          "&client_secret=" + Meteor.accounts.facebook._secret +
          "&code=" + req.query.code).content;

      // Errors come back as JSON but success looks like a query encoded in a url
      var error_response = null;
      try {
        // Just try to parse so that we know if we failed or not,
        // while storing the parsed results
        var error_response = JSON.parse(response);
      } catch (e) {
      }

      if (error_response) {
        if (error_response.error) {
          throw new Meteor.Error("Error trying to get access token from Facebook", error_response);
        } else {
          throw new Meteor.Error("Unexpected response when trying to get access token from Facebook", error_response);
        }
      } else {
        // Success!  Extract the facebook access token from the
        // response
        var fbAccessToken;
        _.each(response.split('&'), function(kvString) {
          var kvArray = kvString.split('=');
          if (kvArray[0] === 'access_token')
            fbAccessToken = kvArray[1];
          // XXX also parse the "expires" argument?
        });

        return fbAccessToken;
      }
    } else {
      throw new Meteor.Error("Unknown OAuth provider: " + provider);
    }
  }