function() {
    network.init({ cookiesEnabledOverride: true });
    network.cookiesEnabled(function(status) {
      equal(status, true, "cookies are enabled, correct status");
      start();
    }, testHelpers.unexpectedXHRFailure);
  }