function(options) {
      // XXX write test for updateOrCreateUser
      var updateOrCreateUser = function(email, fbId, fbAccessToken) {
        var userByEmail = Meteor.users.findOne({emails: email});
        if (userByEmail) {
          var user = userByEmail;
          if (!user.services || !user.services.facebook)
            Meteor.users.update(user, {$set: {"services.facebook": {
              id: fbId,
              accessToken: fbAccessToken
            }}});
          return user._id;
        } else {
          var userByFacebookId = Meteor.users.findOne({"services.facebook.id": fbId});
          if (userByFacebookId) {
            var user = userByFacebookId;
            if (user.emails.indexOf(email) === -1) {
              // The user may have changed the email address associated with
              // their facebook account.
              Meteor.users.update(user, {$push: {emails: email}});
            }
            return user._id;
          } else {
            return Meteor.users.insert({
              emails: [email],
              services: {
                facebook: {id: fbId, accessToken: fbAccessToken}
              }
            });
          }
        }
      };

      if (options.oauth) {
        if (options.oauth.version !== 2 || options.oauth.provider !== 'facebook')
          throw new Meteor.Error("We only support facebook login for now. More soon!");

        var fbAccessToken;
        if (unmatchedOauthRequests[options.oauth.state]) {
          // We had previously received the HTTP request with the OAuth code
          fbAccessToken = handleOauthRequest(
            unmatchedOauthRequests[options.oauth.state]);
          delete unmatchedOauthRequests[options.oauth.state];
        } else {
          if (oauthFutures[options.oauth.state])
            throw new Error("STRANGE! We are trying to set up a future for this OAuth state twice " +
                            "(this could happen if one calls login twice without waiting). " +
                            options.oauth.state);

          // Prepare Future that will be `return`ed when we get an incoming
          // HTTP request with the OAuth code
          oauthFutures[options.oauth.state] = new Future;
          fbAccessToken = oauthFutures[options.oauth.state].wait();
          delete oauthFutures[options.oauth.state];
        }

        if (!fbAccessToken) {
          // if cancelled or not authorized
          throw new Meteor.Error("Login cancelled or not authorized by user");
        }

        // Fetch user's facebook identity
        var identity = Meteor.http.get(
          "https://graph.facebook.com/me?access_token=" + fbAccessToken).data;
        this.setUserId(updateOrCreateUser(identity.email, identity.id, fbAccessToken));

        // Generate and store a login token for reconnect
        var loginToken = Meteor.accounts._loginTokens.insert({
          userId: this.userId()
        });

        return {
          token: loginToken,
          id: this.userId()
        };
      } else if (options.resume) {
        var loginToken = Meteor.accounts._loginTokens.findOne({_id: options.resume});
        if (!loginToken)
          throw new Meteor.Error("Couldn't find login token");
        this.setUserId(loginToken.userId);

        return {
          token: loginToken,
          id: this.userId()
        };
      } else {
        throw new Meteor.Error("Unrecognized options for login request");
      }
  }