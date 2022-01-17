function() {
    controller.destroy();
    createController({ password_reset: true });
    ok($("#set_password").length, "set_password template added");
    equal($("#password_reset").length, 1, "correct button shown");
    equal($("#cancel").length, 1, "cancel button shown");
  }