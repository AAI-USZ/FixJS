function() {
    var TEN_MINS_IN_MS = 10 * 60 * 1000;
    createController();
    network.withContext(function() {
      var timestamp = controller.getCurrent().timestamp;
      ok(timestamp, "a timestamp has been passed: " + timestamp);
      equal(timestamp % TEN_MINS_IN_MS, 0, "timestamp has been rounded to a 10 minute interval");
      start();
    });
  }