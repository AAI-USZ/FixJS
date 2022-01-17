function() {
  "use strict";

  var bid = BrowserID,
      testHelpers = bid.TestHelpers;

  module("/common/js/enable_cookies_url", {
    setup: function() {
      testHelpers.setup();
    },

    teardown: function() {
      testHelpers.teardown();
    }
  });

  test("returns a URL", function() {
    ok(bid.EnableCookiesURL.getURL(), "a URL is returned");
  });
}