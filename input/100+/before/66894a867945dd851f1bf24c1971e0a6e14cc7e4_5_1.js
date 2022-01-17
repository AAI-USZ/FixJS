function() {
    transport.useResult("pending");

    // To properly check the user registration status, we first have to
    // simulate the first checkAuth or else network has no context from which
    // to work.
    network.checkAuth(function(auth_status) {
      equal(!!auth_status, false, "user not yet authenticated");
      network.checkUserRegistration("registered@testuser.com", function(status) {
        equal(status, "pending");
        network.checkAuth(function(auth_status) {
          equal(!!auth_status, false, "user not yet authenticated");
          start();
        }, testHelpers.unexpectedFailure);
      }, testHelpers.unexpectedFailure);
    }, testHelpers.unexpectedFailure);
  }