function() {
      lib.createPrimaryUser({email: "unregistered@testuser.com"}, function(status) {
        equal(status, "primary.verified", "primary user is already verified, correct status");
        network.checkAuth(function(authenticated) {
          equal(authenticated, "assertion", "after provisioning user, user should be automatically authenticated to Persona");
          start();
        });
      }, testHelpers.unexpectedXHRFailure);
    }