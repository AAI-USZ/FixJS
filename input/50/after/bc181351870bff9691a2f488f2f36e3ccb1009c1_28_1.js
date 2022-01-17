function() {
    ok($("#set_password").length, "set_password template added");
    testElementExists("#verify_user");
    testElementExists("#cancel");
    testElementNotExists("#persona_tospp");
  }