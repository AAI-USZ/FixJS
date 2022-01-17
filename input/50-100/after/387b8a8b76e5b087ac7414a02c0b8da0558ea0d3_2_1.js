function() {
    network.init({ cookiesEnabledOverride: false });
    network.cookiesEnabled(function(status) {
      equal(status, false, "cookies are disabled, correct status");
      start();
    }, testHelpers.unexpectedXHRFailure);
  }