function() {
    var email = "registered@testuser.com";
    xhr.useResult("known_secondary");
    xhr.setContextInfo("auth_level", "password");

    createController({
      email: email,
      siteTOSPP: true,
      ready: function() {
        testHelpers.testRPTosPPShown();
        start();
      }
    });
  }