function(auth_level) {
          equal(auth_level, "password", "user can only be authenticated to password level after verification is complete");
          start();
        }