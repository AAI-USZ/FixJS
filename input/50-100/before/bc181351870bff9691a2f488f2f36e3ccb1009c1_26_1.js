function() {
    var email = "registered@testuser.com";
    xhr.useResult("known_secondary");

    equal($(".tospp").length, 0, "tospp has not yet been added to the DOM");
    createController({
      email: "registered@testuser.com",
      privacyURL: "http://testuser.com/priv.html",
      tosURL: "http://testuser.com/tos.html",
      ready: function() {
        equal($(".tospp").length, 1, "tospp has been added to the DOM");
        start();
      }
    });
  }