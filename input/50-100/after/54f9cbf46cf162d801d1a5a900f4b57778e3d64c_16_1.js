function() {
    createController({
      window: win,
      add: false,
      requiredEmail: "unregistered@testuser.com",
      email: "unregistered@testuser.com",
      auth_url: "http://testuser.com/sign_in",
      siteTOSPP: true
    });

    testElementExists(".tospp", "tospp has been added to the DOM");
  }