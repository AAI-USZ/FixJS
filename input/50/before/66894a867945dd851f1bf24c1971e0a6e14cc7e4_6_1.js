function(status) {
      equal(status, "complete", "complete response expected");

      ok(!storage.getReturnTo(), "staged on behalf of is cleared when validation completes");
      start();
    }