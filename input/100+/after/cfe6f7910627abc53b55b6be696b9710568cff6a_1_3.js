function(error, result) {
      if (error) {
        Meteor._debug("Server error on login", error);
        return;
      }

      Meteor.accounts.loginAndStoreToken(result.token);
      callback && callback();
    }