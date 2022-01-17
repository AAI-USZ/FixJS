function() {
    createController({
      ready: function() {
        var email;
        testHelpers.register("user_staged", function(msg, info) {
          email = info.email;
        });

        controller.doStageUser({ email: TEST_EMAIL, password: "password", ready: function(status) {
          equal(status, true, "correct status");
          equal(email, TEST_EMAIL, "user successfully staged");
          start();
        }});
      }
    });
  }