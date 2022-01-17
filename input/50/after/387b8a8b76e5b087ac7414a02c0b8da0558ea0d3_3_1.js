function onComplete(authenticated) {
      equal(authenticated, false, "We are not authenticated!");
      testUndefined(storage.getEmail(TEST_EMAIL), "localStorage was cleared");
      start();
    }