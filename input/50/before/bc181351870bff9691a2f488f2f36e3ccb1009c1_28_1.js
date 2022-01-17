function() {
    ok($("#set_password").length, "set_password template added");
    equal($("#verify_user").length, 1, "correct button shown");
    equal($("#cancel").length, 1, "cancel button shown");
  }