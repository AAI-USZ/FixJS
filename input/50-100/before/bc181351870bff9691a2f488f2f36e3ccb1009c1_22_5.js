function() {
    storage.addEmail(TEST_EMAIL, { type: "secondary" });
    xhr.setContextInfo("auth_level", "password");

    mediator.subscribe("email_valid_and_ready", function(msg, info) {
      equal(info.email, TEST_EMAIL, "correctly redirected to email_valid_and_ready with correct email");
      start();
    });

    mediator.publish("email_chosen", {
      email: TEST_EMAIL
    });
  }