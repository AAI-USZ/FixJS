function () {
    Meteor.apply('logout', [], {wait: true}, function(error, result) {
      if (error) {
        Meteor._debug("Server error on logout", error);
        return;
      } else {
        Meteor.accounts.forceClientLoggedOut();
      }
    });
  }