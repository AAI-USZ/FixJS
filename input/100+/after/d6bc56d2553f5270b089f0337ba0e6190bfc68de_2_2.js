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
        var unmatchedRequest = Meteor.accounts._unmatchedOauthRequests[options.oauth.state];
        if (unmatchedRequest) {
          // We had previously received the HTTP request with the OAuth code
          fbAccessToken = handleOauthRequest(unmatchedRequest);
          delete Meteor.accounts._unmatchedOauthRequests[options.oauth.state];

          // If the user didn't authorize the login, either explicitly
          // or by closing the popup window, return null
          if (!fbAccessToken)
            return null;
        } else {
          return null;
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