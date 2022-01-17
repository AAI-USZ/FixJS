function(error, result) {
          if (error) {
            Meteor.accounts.forceClientLoggedOut();
            Meteor._debug("Server error on login", error);
            return;
          }
        }