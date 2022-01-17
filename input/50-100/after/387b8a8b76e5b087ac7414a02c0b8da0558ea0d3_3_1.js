function() {
    storage.addSecondaryEmail(TEST_EMAIL);
    xhr.setContextInfo("auth_level", "primary");

    lib.checkAuthentication(function(authenticated) {
      equal(authenticated, "primary", "We are authenticated!");
      testNotUndefined(storage.getEmail(TEST_EMAIL), "localStorage is not cleared");
      start();
    });
  }