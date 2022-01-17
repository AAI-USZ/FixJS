function(onSuccess) {
    lib.authenticate(TEST_EMAIL, "testuser", function(authenticated) {
      lib.syncEmails(function() {
        var storedIdentities = storage.getEmails();
        equal(_.size(storedIdentities), 1, "one identity");

        lib.logoutUser(function() {
          storedIdentities = storage.getEmails();
          equal(_.size(storedIdentities), 0, "All items have been removed on logout");

          start();
        }, testHelpers.unexpectedXHRFailure);
      }, testHelpers.unexpectedXHRFailure);
    }, testHelpers.unexpectedXHRFailure);


  }