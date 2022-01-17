function() {
  "use strict";

  var bid = BrowserID,
      mediator = bid.Mediator,
      transport = bid.Mocks.xhr,
      testHelpers = bid.TestHelpers,
      TEST_EMAIL = "testuser@testuser.com",
      TEST_PASSWORD = "password",
      failureCheck = testHelpers.failureCheck,
      testObjectValuesEqual = testHelpers.testObjectValuesEqual;

  var network = BrowserID.Network;

  module("common/js/network", {
    setup: function() {
      testHelpers.setup();
    },
    teardown: function() {
      testHelpers.teardown();
    }
  });

  function testVerificationPending(funcName) {
    transport.useResult("pending");

    network[funcName]("registered@testuser.com", function(status) {
      equal(status, "pending");
      start();
    }, testHelpers.unexpectedFailure);
  }

  function testVerificationMustAuth(funcName) {
    transport.useResult("mustAuth");

    network.checkAuth(function(auth_status) {
      equal(!!auth_status, false, "user not yet authenticated");
      network[funcName]("registered@testuser.com", function(status) {
        equal(status, "mustAuth");
        network.checkAuth(function(auth_status) {
          equal(!!auth_status, false, "user not yet authenticated");
          start();
        }, testHelpers.unexpectedFailure);
      }, testHelpers.unexpectedFailure);
    }, testHelpers.unexpectedFailure);
  }

  function testVerificationComplete(funcName) {
    network.withContext(function() {
      transport.useResult("complete");
      network[funcName]("registered@testuser.com", function(status) {
        equal(status, "complete");
        start();
      }, testHelpers.unexpectedFailure);
    });
  }


  asyncTest("authenticate with valid user", function() {
    network.authenticate(TEST_EMAIL, "testuser", function onSuccess(authenticated) {
      equal(authenticated, true, "valid authentication");
      start();
    }, testHelpers.unexpectedXHRFailure);
  });

  asyncTest("authenticate with invalid user", function() {
    transport.useResult("invalid");
    network.authenticate(TEST_EMAIL, "invalid", function onSuccess(authenticated) {
      equal(authenticated, false, "invalid authentication");
      start();
    }, testHelpers.unexpectedXHRFailure);
  });

  asyncTest("authenticate with XHR failure after context already setup", function() {
    failureCheck(network.authenticate, TEST_EMAIL, "ajaxError");
  });

  asyncTest("authenticateWithAssertion with valid email/assertioni, returns true status", function() {
    network.authenticateWithAssertion(TEST_EMAIL, "test_assertion", function(status) {
      equal(status, true, "user authenticated, status set to true");
      start();
    }, testHelpers.unexpectedXHRFailure);
  });

  asyncTest("authenticateWithAssertion with invalid email/assertion", function() {
    transport.useResult("invalid");

    network.authenticateWithAssertion(TEST_EMAIL, "test_assertion", function(status) {
      equal(status, false, "user not authenticated, status set to false");
      start();
    }, testHelpers.unexpectedXHRFailure);
  });

  asyncTest("authenticateWithAssertion with XHR failure", function() {
    failureCheck(network.authenticateWithAssertion, TEST_EMAIL, "test_assertion");
  });

  asyncTest("checkAuth: simulate a delayed request - xhr_delay and xhr_complete both triggered", function() {
    transport.setContextInfo("auth_level", "primary");
    transport.setDelay(200);
    network.init({
      time_until_delay: 100
    });

    var delayInfo;
    mediator.subscribe("xhr_delay", function(msg, delay_info) {
      delayInfo = delay_info;
    });

    var completeInfo;
    mediator.subscribe("xhr_complete", function(msg, complete_info) {
      completeInfo = complete_info;
    });

    network.checkAuth(function onSuccess(authenticated) {
      equal(authenticated, "primary", "we have an authentication");
      equal(delayInfo.network.url, "/wsapi/session_context", "delay info correct");
      equal(completeInfo.network.url, "/wsapi/session_context", "complete info correct");
      start();
    }, testHelpers.unexpectedXHRFailure);
  });

  asyncTest("checkAuth: immediate success return - no xhr_delay triggered", function() {
    transport.setContextInfo("auth_level", "primary");

    transport.setDelay(50);
    network.init({
      time_until_delay: 100
    });

    mediator.subscribe("xhr_delay", function(msg, delay_info) {
      ok(false, "unexpected call to xhr_delay");
    });

    network.checkAuth(function onSuccess(authenticated) {
      // a wait to happen to give xhr_delay a chance to return
      setTimeout(start, 150);
    }, testHelpers.unexpectedXHRFailure);
  });

  asyncTest("checkAuth with valid authentication", function() {
    transport.setContextInfo("auth_level", "primary");
    network.checkAuth(function onSuccess(authenticated) {
      // a wait to happen to give xhr_delay a chance to return
      equal(authenticated, "primary", "we have an authentication");
      start();
    }, testHelpers.unexpectedXHRFailure);
  });

  asyncTest("checkAuth with invalid authentication", function() {
    transport.useResult("invalid");
    transport.setContextInfo("auth_level", undefined);

    network.checkAuth(function onSuccess(authenticated) {
      equal(authenticated, undefined, "we are not authenticated");
      start();
    }, testHelpers.unexpectedXHRFailure);
  });



  asyncTest("checkAuth with XHR failure", function() {
    transport.useResult("ajaxError");
    transport.setContextInfo("auth_level", undefined);

    // Do not convert this to failureCheck, we do this manually because
    // checkAuth does not make an XHR request.  Since it does not make an XHR
    // request, we do not test whether the app is notified of an XHR failure
    network.checkAuth(function onSuccess() {
      ok(true, "checkAuth does not make an ajax call, all good");
      start();
    }, testHelpers.unexpectedFailure);
  });


  asyncTest("logout", function() {
    network.logout(function onSuccess() {
      ok(true, "we can logout");
      start();
    }, testHelpers.unexpectedXHRFailure);
  });


  asyncTest("logout with 400 failure - user already logged out", function() {
    transport.useResult("not_authenticated");

    network.logout(function onSuccess() {
      ok(true, "we can logout");
      start();
    }, testHelpers.unexpectedXHRFailure);
  });

  asyncTest("logout with XHR failure", function() {
    failureCheck(network.logout);
  });


  asyncTest("completeEmailRegistration valid", function() {
    network.completeEmailRegistration("goodtoken", "password", function onSuccess(proven) {
      equal(proven, true, "good token proved");
      start();
    }, testHelpers.unexpectedXHRFailure);
  });

  asyncTest("completeEmailRegistration with valid token, bad password", function() {
    transport.useResult("badPassword");
    network.completeEmailRegistration("token", "password",
      testHelpers.unexpectedSuccess,
      testHelpers.expectedXHRFailure);
  });

  asyncTest("completeEmailRegistration with invalid token", function() {
    transport.useResult("invalid");
    network.completeEmailRegistration("badtoken", "password", function onSuccess(proven) {
      equal(proven, false, "bad token could not be proved");
      start();
    }, testHelpers.unexpectedXHRFailure);
  });

  asyncTest("completeEmailRegistration with XHR failure", function() {
    failureCheck(network.completeEmailRegistration, "goodtoken", "password");
  });

  asyncTest("createUser with valid user", function() {
    network.createUser("validuser", "password", "origin", function onSuccess(created) {
      ok(created);
      start();
    }, testHelpers.unexpectedFailure);
  });

  asyncTest("createUser with invalid user", function() {
    transport.useResult("invalid");
    network.createUser("invaliduser", "password", "origin", function onSuccess(created) {
      equal(created, false);
      start();
    }, testHelpers.unexpectedFailure);
  });

  asyncTest("createUser throttled", function() {
    transport.useResult("throttle");

    network.createUser("validuser", "password", "origin", function onSuccess(added) {
      equal(added, false, "throttled email returns onSuccess but with false as the value");
      start();
    }, testHelpers.unexpectedFailure);
  });

  asyncTest("createUser with XHR failure", function() {
    failureCheck(network.createUser, "validuser", "password", "origin");
  });

  asyncTest("checkUserRegistration returns pending - pending status, user is not logged in", testVerificationPending.curry("checkUserRegistration"));

  asyncTest("checkUserRegistration returns mustAuth - mustAuth status, user is not logged in", testVerificationMustAuth.curry("checkUserRegistration"));

  asyncTest("checkUserRegistration returns complete - complete status, user is logged in", testVerificationComplete.curry("checkUserRegistration"));

  asyncTest("checkUserRegistration with XHR failure", function() {
    failureCheck(network.checkUserRegistration, "registered@testuser.com");
  });

  asyncTest("completeUserRegistration with valid token, no password required", function() {
    network.completeUserRegistration("token", undefined, function(registered) {
      ok(registered);
      start();
    }, testHelpers.unexpectedFailure);
  });

  asyncTest("completeUserRegistration with valid token, bad password", function() {
    transport.useResult("badPassword");
    network.completeUserRegistration("token", "password",
      testHelpers.unexpectedSuccess,
      testHelpers.expectedXHRFailure);
  });

  asyncTest("completeUserRegistration with valid token, password required", function() {
    network.completeUserRegistration("token", "password", function(registered) {
      ok(registered);
      start();
    }, testHelpers.unexpectedFailure);
  });

  asyncTest("completeUserRegistration with invalid token", function() {
    transport.useResult("invalid");

    network.completeUserRegistration("token", "password", function(registered) {
      equal(registered, false);
      start();
    }, testHelpers.unexpectedFailure);
  });

  asyncTest("completeUserRegistration with XHR failure", function() {
    failureCheck(network.completeUserRegistration, "token", "password");
  });

  asyncTest("cancelUser valid", function() {

    network.cancelUser(function() {
      // XXX need a test here.
      ok(true);
      start();
    }, testHelpers.unexpectedFailure);
  });

  asyncTest("cancelUser invalid", function() {
    transport.useResult("invalid");

    network.cancelUser(function() {
      // XXX need a test here.
      ok(true);
      start();
    }, testHelpers.unexpectedFailure);
  });

  asyncTest("cancelUser with XHR failure", function() {
    failureCheck(network.cancelUser);
  });

  asyncTest("emailRegistered with taken email", function() {
    network.emailRegistered("registered@testuser.com", function(taken) {
      equal(taken, true, "a taken email is marked taken");
      start();
    }, testHelpers.unexpectedFailure);
  });

  asyncTest("emailRegistered with nottaken email", function() {
    network.emailRegistered("unregistered@testuser.com", function(taken) {
      equal(taken, false, "a not taken email is not marked taken");
      start();
    }, testHelpers.unexpectedFailure);
  });

  asyncTest("emailRegistered with XHR failure", function() {
    failureCheck(network.emailRegistered, "registered@testuser.com");
  });


  asyncTest("addSecondaryEmail valid", function() {
    network.addSecondaryEmail(TEST_EMAIL, TEST_PASSWORD, "origin", function onSuccess(added) {
      ok(added);
      start();
    }, testHelpers.unexpectedFailure);
  });

  asyncTest("addSecondaryEmail invalid", function() {
    transport.useResult("invalid");
    network.addSecondaryEmail(TEST_EMAIL, TEST_PASSWORD, "origin", function onSuccess(added) {
      equal(added, false);
      start();
    }, testHelpers.unexpectedFailure);
  });

  asyncTest("addSecondaryEmail throttled", function() {
    transport.useResult("throttle");

    network.addSecondaryEmail(TEST_EMAIL, TEST_PASSWORD, "origin", function onSuccess(added) {
      equal(added, false, "throttled email returns onSuccess but with false as the value");
      start();
    }, testHelpers.unexpectedFailure);
  });

  asyncTest("addSecondaryEmail with XHR failure", function() {
    failureCheck(network.addSecondaryEmail, TEST_EMAIL, TEST_PASSWORD, "origin");
  });

  asyncTest("checkEmailRegistration pending", testVerificationPending.curry("checkEmailRegistration"));
  asyncTest("checkEmailRegistration mustAuth", testVerificationMustAuth.curry("checkEmailRegistration"));
  asyncTest("checkEmailRegistration complete", testVerificationComplete.curry("checkEmailRegistration"));

  asyncTest("checkEmailRegistration with XHR failure", function() {
    failureCheck(network.checkEmailRegistration, TEST_EMAIL);
  });


  asyncTest("addEmailWithAssertion, user not authenticated or invalid assertion, returns false status", function() {
    transport.useResult("invalid");

    network.addEmailWithAssertion("test_assertion", function(status) {
      equal(status, false, "email not added, status set to false");
      start();
    }, testHelpers.unexpectedXHRFailure);
  });

  asyncTest("addEmailWithAssertion valid asserton, returns true status", function() {
    network.addEmailWithAssertion("test_assertion", function(status) {
      equal(status, true, "email added, status set to true");
      start();
    }, testHelpers.unexpectedXHRFailure);
  });

  asyncTest("addEmailWithAssertion with XHR failure", function() {
    failureCheck(network.addEmailWithAssertion, "test_assertion");
  });


  asyncTest("emailForVerificationToken with XHR failure", function() {
    failureCheck(network.emailForVerificationToken, "token");
  });

  asyncTest("emailForVerificationToken with invalid token - returns null result", function() {
    transport.useResult("invalid");

    network.emailForVerificationToken("token", function(result) {
      equal(result, null, "invalid token returns null result");
      start();
    }, testHelpers.unexpectedXHRFailure);
  });

  asyncTest("emailForVerificationToken that must authenticate - returns must_auth and email address", function() {
    transport.useResult("mustAuth");

    network.emailForVerificationToken("token", function(result) {
      testObjectValuesEqual(result, { must_auth: true, email: TEST_EMAIL });
      start();
    }, testHelpers.unexpectedXHRFailure);
  });

  asyncTest("emailForVerificationToken that does not need password", function() {
    network.emailForVerificationToken("token", function(result) {
      equal(result.needs_password, false, "needs_password correctly set to false");
      equal(result.email, TEST_EMAIL, "email address correctly added");
      start();
    }, testHelpers.unexpectedXHRFailure);
  });

  asyncTest("removeEmail valid", function() {
    network.removeEmail("validemail", function onSuccess() {
      // XXX need a test here;
      ok(true);
      start();
    }, testHelpers.unexpectedFailure);
  });

  asyncTest("removeEmail invalid", function() {
    transport.useResult("invalid");

    network.removeEmail("invalidemail", function onSuccess() {
      // XXX need a test here;
      ok(true);
      start();
    }, testHelpers.unexpectedFailure);
  });

  asyncTest("removeEmail with XHR failure", function() {
    failureCheck(network.removeEmail, "invalidemail");
  });


  asyncTest("requestPasswordReset - true status", function() {
    network.requestPasswordReset(TEST_EMAIL, "password", "origin", function onSuccess(status) {
      equal(status, true, "password reset request success");
      start();
    }, testHelpers.unexpectedFailure);
  });

  asyncTest("requestPasswordReset with XHR failure", function() {
    failureCheck(network.requestPasswordReset, TEST_EMAIL, "password", "origin");
  });

  asyncTest("completePasswordReset with valid token, no password required", function() {
    network.completePasswordReset("token", undefined, function(registered) {
      ok(registered);
      start();
    }, testHelpers.unexpectedFailure);
  });

  asyncTest("completePasswordReset with valid token, bad password", function() {
    transport.useResult("badPassword");
    network.completePasswordReset("token", "password",
      testHelpers.unexpectedSuccess,
      testHelpers.expectedXHRFailure);
  });

  asyncTest("completePasswordReset with valid token, password required", function() {
    network.completePasswordReset("token", "password", function(registered) {
      ok(registered);
      start();
    }, testHelpers.unexpectedFailure);
  });

  asyncTest("completePasswordReset with invalid token", function() {
    transport.useResult("invalid");

    network.completePasswordReset("token", "password", function(registered) {
      equal(registered, false);
      start();
    }, testHelpers.unexpectedFailure);
  });

  asyncTest("completePasswordReset with XHR failure", function() {
    failureCheck(network.completePasswordReset, "token", "password");
  });

  asyncTest("checkPasswordReset pending", testVerificationPending.curry("checkPasswordReset"));
  asyncTest("checkPasswordReset mustAuth", testVerificationMustAuth.curry("checkPasswordReset"));
  asyncTest("checkPasswordReset complete", testVerificationComplete.curry("checkPasswordReset"));


  asyncTest("requestEmailReverify - true status", function() {
    network.requestEmailReverify(TEST_EMAIL, "origin", function onSuccess(status) {
      equal(status, true, "password reset request success");
      start();
    }, testHelpers.unexpectedFailure);
  });

  asyncTest("requestEmailReverify with XHR failure", function() {
    failureCheck(network.requestEmailReverify, TEST_EMAIL, "origin");
  });

  asyncTest("checkEmailReverify pending", testVerificationPending.curry("checkEmailReverify"));
  asyncTest("checkEmailReverify mustAuth", testVerificationMustAuth.curry("checkEmailReverify"));
  asyncTest("checkEmailReverify complete", testVerificationComplete.curry("checkEmailReverify"));


  asyncTest("setPassword happy case expects true status", function() {
    network.setPassword("password", function onComplete(status) {
      equal(status, true, "correct status");
      start();
    }, testHelpers.unexpectedXHRFailure);
  });

  asyncTest("setPassword with XHR failure", function() {
    failureCheck(network.setPassword, "password");
  });

  asyncTest("serverTime", function() {
    // I am forcing the server time to be 1.25 seconds off.
    transport.setContextInfo("server_time", new Date().getTime() - 1250);

    network.serverTime(function onSuccess(time) {
      var diff = Math.abs((new Date()) - time);
      equal(1245 < diff && diff < 1255, true, "server time and local time should be less than 100ms different (is " + diff + "ms different)");
      // XXX by stomlinson - I think this is an incorrect test.  The time returned here is the
      // time as it is on the server, which could be more than 100ms off of
      // what the local machine says it is.
      //equal(Math.abs(diff) < 100, true, "server time and local time should be less than 100ms different (is " + diff + "ms different)");
      start();
    }, function onfailure() {
      start();
    });

  });

  asyncTest("serverTime with XHR failure before context has been setup", function() {
    transport.useResult("contextAjaxError");

    failureCheck(network.serverTime);
  });

  asyncTest("codeVersion", function() {
    network.codeVersion(function onComplete(version) {
      equal(version, "ABC123", "version returned properly");
      start();
    }, testHelpers.unexpectedFailure);
  });

  asyncTest("codeVersion with XHR failure", function() {
    transport.useResult("contextAjaxError");

    failureCheck(network.codeVersion);
  });

  asyncTest("addressInfo with unknown secondary email", function() {
    transport.useResult("unknown_secondary");

    network.addressInfo(TEST_EMAIL, function onComplete(data) {
      equal(data.type, "secondary", "type is secondary");
      equal(data.known, false, "address is unknown to BrowserID");
      start();
    }, testHelpers.unexpectedXHRFailure);
  });

  asyncTest("addressInfo with known seconday email", function() {
    transport.useResult("known_secondary");

    network.addressInfo(TEST_EMAIL, function onComplete(data) {
      equal(data.type, "secondary", "type is secondary");
      equal(data.known, true, "address is known to BrowserID");
      start();
    }, testHelpers.unexpectedXHRFailure);
  });

  asyncTest("addressInfo with primary email", function() {
    transport.useResult("primary");

    network.addressInfo(TEST_EMAIL, function onComplete(data) {
      equal(data.type, "primary", "type is primary");
      ok("auth" in data, "auth field exists");
      ok("prov" in data, "prov field exists");
      start();
    }, testHelpers.unexpectedXHRFailure);
  });

  asyncTest("addressInfo with XHR failure", function() {
    failureCheck(network.addressInfo, TEST_EMAIL);
  });

  asyncTest("changePassword happy case, expect complete callback with true status", function() {
    network.changePassword("oldpassword", "newpassword", function onComplete(status) {
      equal(status, true, "calls onComplete with true status");
      start();
    }, testHelpers.unexpectedFailure);
  });

  asyncTest("changePassword with incorrect old password, expect complete callback with false status", function() {
    transport.useResult("incorrectPassword");

    network.changePassword("oldpassword", "newpassword", function onComplete(status) {
      equal(status, false, "calls onComplete with false status");
      start();
    }, testHelpers.unexpectedFailure);
  });

  asyncTest("changePassword with XHR failure, expect error callback", function() {
    failureCheck(network.changePassword, "oldpassword", "newpassword");
  });

  asyncTest("cookiesEnabled with cookies enabled - return true status", function() {
    network.init({ cookiesEnabledOverride: true });
    network.cookiesEnabled(function(status) {
      equal(status, true, "cookies are enabled, correct status");
      start();
    }, testHelpers.unexpectedXHRFailure);
  });

  asyncTest("cookiesEnabled with cookies disabled - return true status", function() {
    network.init({ cookiesEnabledOverride: false });
    network.cookiesEnabled(function(status) {
      equal(status, false, "cookies are disabled, correct status");
      start();
    }, testHelpers.unexpectedXHRFailure);
  });

  asyncTest("cookiesEnabled with browser defined cookie status - wait and see", function() {
    network.cookiesEnabled(function(status) {
      equal(status, true, "hopefully cookies are enabled, correct status");
      start();
    }, testHelpers.unexpectedXHRFailure);
  });

  asyncTest("cookiesEnabled with onComplete exception thrown - should not call onComplete a second time", function() {
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
  });

  asyncTest("prolongSession with authenticated user, success - call complete", function() {
    network.authenticate(TEST_EMAIL, "password", function() {
      network.prolongSession(function() {
        ok(true, "prolongSession completed");
        start();
      }, testHelpers.unexpectedXHRFailure);
    }, testHelpers.unexpectedXHRFailure);
  });

  asyncTest("prolongSession with unauthenticated user - call failure", function() {
    transport.useResult("unauthenticated");
    network.prolongSession(testHelpers.unexpectedSuccess, testHelpers.expectedXHRFailure);
  });

  asyncTest("prolongSession with XHR Failure - call failure", function() {
    transport.useResult("ajaxError");
    network.prolongSession(testHelpers.unexpectedSuccess, testHelpers.expectedXHRFailure);
  });

  asyncTest("sendInteractionData success - call success", function() {
    var data = {};
    network.sendInteractionData(data, function(status) {
      equal(status, true, "complete with correct status");
      start();
    }, testHelpers.unexpectedXHRFailure);
  });

  asyncTest("sendInteractionData with XHR failure - call failure", function() {
    var data = {};
    transport.useResult("ajaxError");
    network.sendInteractionData(data, testHelpers.unexpectedSuccess, testHelpers.expectedXHRFailure);
  });

}