function() {
    createController({
      window: win,
      add: false,
      requiredEmail: "unregistered@testuser.com",
      email: "unregistered@testuser.com",
      auth_url: "http://testuser.com/sign_in",
      privacyURL: "http://testuser.com/priv.html",
      tosURL: "http://testuser.com/tos.html"
    });

    equal($(".tospp").length, 1, "tospp has been added to the DOM");
  }