function() {
    xhr.setContextInfo("auth_level", "assertion");

    testPasswordChangeSuccess("oldpassword", "newpassword", "proper completion after authenticating user");
  }