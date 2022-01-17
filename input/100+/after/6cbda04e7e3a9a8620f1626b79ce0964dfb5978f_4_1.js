function() {
  "use strict";

  var bid = BrowserID,
      helpers = bid.Helpers,
      testHelpers = bid.TestHelpers;

  module("common/js/helpers", {
    setup: function() {
      testHelpers.setup();
      bid.Renderer.render("#page_head", "site/signin", {});
    },

    teardown: function() {
      testHelpers.teardown();
    }
  });

  test("getAndValidateEmail with valid email", function() {
    $("#email").val("testuser@testuser.com");
    var email = helpers.getAndValidateEmail("#email");

    equal(email, "testuser@testuser.com", "valid email returns email");
  });

  test("getAndValidateEmail with valid email with leading and trailing whitespace", function() {
    $("#email").val(" testuser@testuser.com ");
    var email = helpers.getAndValidateEmail("#email");

    equal(email, "testuser@testuser.com", "valid email with leading/trailing whitespace returns trimmed email");
  });

  test("getAndValidateEmail with invalid email returns null", function() {
    $("#email").val("testuser");
    var email = helpers.getAndValidateEmail("#email");

    strictEqual(email, null, "invalid email returns null");
  });

  test("getAndValidateEmail with invalid target returns null", function() {
    var email = helpers.getAndValidateEmail("#nonexistent");

    strictEqual(email, null, "invalid target returns null");
  });

  test("getAndValidatePassword with valid password returns password", function() {
    $("#password").val("password");
    var password = helpers.getAndValidatePassword("#password");

    equal(password, "password", "password retreived correctly");
  });

  test("getAndValidatePassword with invalid password returns null", function() {
    $("#password").val("");
    var password = helpers.getAndValidatePassword("#password");

    strictEqual(password, null, "invalid password returns null");
  });

  test("getAndValidatePassword with invalid target returns null", function() {
    var password = helpers.getAndValidatePassword("#nonexistent");

    strictEqual(password, null, "invalid target returns null");
  });

  test("toURL with no GET parameters", function() {
    var url = helpers.toURL("https://login.persona.org");

    equal(url, "https://login.persona.org", "correct URL without GET parameters");
  });

  test("toURL with GET parameters", function() {
    var url = helpers.toURL("https://login.persona.org", {
      email: "testuser@testuser.com",
      status: "complete"
    });

    equal(url, "https://login.persona.org?email=testuser%40testuser.com&status=complete", "correct URL with GET parameters");
  });

  test("whitelistFilter an object", function() {
    var unfiltered = {
      'event_stream': [ ['pie', 6], ['coffee', 19], ['flan', 42] ],
      'secret': "ATTACK AT DAWN!",
      'location': "Zeta Minor",
      'lang': 'auld' };

    var filtered = helpers.whitelistFilter(unfiltered, ['event_stream', 'lang']);
    equal(typeof filtered.secret, 'undefined', 'non-whitelisted key removed');
    equal(typeof filtered.location, 'undefined', 'non-whitelisted key removed');
    equal(filtered.lang, 'auld', 'whitelisted string passed');
    equal(filtered.event_stream.length, 3, 'whitelisted list passed');
    equal(filtered.event_stream[2][1], 42, 'whitelisted list elements preserved');
  });

  test("simulate log on browser without console - no exception thrown", function() {
    var err,
        nativeConsole = window.console;

    // Simulate browser without window.console.
    window.console = undefined;
    try {
      helpers.log("test message");
    }
    catch(e) {
      err = e;
    }

    equal(typeof err, "undefined", "no exception thrown");

    window.console = nativeConsole;
  });

  test("simulate log on browser without console.log - no exception thrown", function() {
    var err,
        nativeConsole = window.console;

    // Simulate browser with console, but without console.log.
    window.console = {};
    try {
      helpers.log("test message");
    }
    catch(e) {
      err = e;
    }

    equal(typeof err, "undefined", "no exception thrown");

    window.console = nativeConsole;
  });

  test("simulate log on browser with console.log - prints message", function() {
    var err,
        loggedMessage,
        nativeConsole = window.console;

    // Simulate browser with console and console.log
    window.console = {
      log: function(msg) {
        loggedMessage = msg;
      }
    };

    try {
      helpers.log("test message");
    }
    catch(e) {
      err = e;
    }

    equal(typeof err, "undefined", "no exception thrown");
    equal(loggedMessage, "test message", "correct message logged");

    window.console = nativeConsole;
  });
}