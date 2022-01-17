function(status) {
      ok(!storage.getReturnTo(), "staged on behalf of is cleared when validation completes");
      equal(status, "mustAuth", "mustAuth response expected");
      start();
    }