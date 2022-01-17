function() {
    controller.destroy();
    createController({ password_reset: true });
    testElementExists("#set_password");
    testElementExists("#password_reset");
    testElementExists("#cancel");
  }