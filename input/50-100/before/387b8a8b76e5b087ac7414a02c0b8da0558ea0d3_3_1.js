function() {
    xhr.setContextInfo("auth_level", "primary");
    lib.checkAuthentication(function(authenticated) {
      equal(authenticated, "primary", "We are authenticated!");
      start();
    });
  }