function() {
    xhr.useResult("ajaxError");

    createController("waitForUserValidation", "user_verified");
    controller.startCheck(function() {
      register("user_verified", function() {
        ok(false, "on XHR error, should not complete");
      });
      ok(testHelpers.errorVisible(), "Error message is visible");
      start();
    });
  }