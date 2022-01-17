function() {
    createController({
      window: win,
      add: false,
      email: "unregistered@testuser.com",
      auth_url: "http://testuser.com/sign_in",
      siteTOSPP: true
    });

    // XXX There should be a generalized test for this.
    testElementExists(".tospp", "tospp has been added to the DOM");
  }