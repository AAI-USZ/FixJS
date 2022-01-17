function(status) {
      equal(status, "mustAuth", "mustAuth response expected");

      ok(!storage.getReturnTo(), "staged on behalf of is cleared when validation completes");
      start();
    }