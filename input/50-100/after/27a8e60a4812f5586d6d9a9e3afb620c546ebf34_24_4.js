function() {
    user.init({ pollDuration: 100 });
    xhr.useResult("pending");
    xhr.setContextInfo("auth_level", "password");

    testVerifiedUserEvent("user_verified");

    // use setTimeout to simulate a delay in the user opening the email.
    setTimeout(function() {
      xhr.useResult("complete");
    }, 50);
  }