function() {
    equal($(".tospp").length, 0, "tospp has not yet been added to the DOM");
    createController({
      privacyURL: "http://testuser.com/priv.html",
      tosURL: "http://testuser.com/tos.html",
    });

    equal($(".tospp").length, 1, "tospp has been added to the DOM");
  }