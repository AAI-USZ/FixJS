function() {
    // Since we are manually throwing an exception, it must be caught
    // below.
    try {
      network.cookiesEnabled(function(status) {
        // if there is a problem, this callback will be called a second time
        // with a false status.
        equal(status, true, "cookies are enabled, correct status");
        start();

        throw "callback exception";
      }, testHelpers.unexpectedXHRFailure);
    } catch(e) {
      equal(e.toString(), "callback exception", "correct exception caught");
    }
  }