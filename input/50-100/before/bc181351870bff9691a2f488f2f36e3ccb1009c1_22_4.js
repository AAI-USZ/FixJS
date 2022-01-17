function() {
    var email = TEST_EMAIL;
    storage.addEmail(email, { type: "secondary" });

    xhr.setContextInfo("auth_level", "assertion");

    mediator.publish("email_chosen", {
      email: email,
      complete: function() {
        equal(actions.called.doAuthenticateWithRequiredEmail, true, "doAuthenticateWithRequiredEmail called");
        start();
      }
    });
  }