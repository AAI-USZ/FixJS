function() {
  "use strict";

  var bid = BrowserID,
      user = bid.User,
      controller,
      el,
      testHelpers = bid.TestHelpers,
      TEST_EMAIL = "testuser@testuser.com";

  function createController(config) {
    controller = BrowserID.Modules.Actions.create();
    controller.start(config);
  }

  function testActionStartsModule(actionName, actionOptions, expectedModule) {
    createController({
      ready: function() {
        var error;
        try {
          controller[actionName](actionOptions);
        } catch(e) {
          error = e;
        }

        equal(error, "module not registered for " + expectedModule, "correct service started");
        start();
      }
    });
  }

  module("controllers/actions", {
    setup: function() {
      testHelpers.setup();
    },

    teardown: function() {
      if(controller) {
        controller.destroy();
      }
      testHelpers.teardown();
    }
  });

  asyncTest("doProvisionPrimaryUser - start the provision_primary_user service", function() {
    testActionStartsModule("doProvisionPrimaryUser", {email: TEST_EMAIL},
      "provision_primary_user");
  });

  asyncTest("doVerifyPrimaryUser - start the verify_primary_user service", function() {
    testActionStartsModule("doVerifyPrimaryUser", {},
      "verify_primary_user");
  });

  asyncTest("doCannotVerifyRequiredPrimary - show the error screen", function() {
    createController({
      ready: function() {
        controller.doCannotVerifyRequiredPrimary({ email: TEST_EMAIL});

        testHelpers.testErrorVisible();
        start();
      }
    });

  });

  asyncTest("doPrimaryUserProvisioned - start the primary_user_verified service", function() {
    testActionStartsModule("doPrimaryUserProvisioned", {},
      "primary_user_provisioned");
  });

  asyncTest("doConfirmUser - start the check_registration service", function() {
    testActionStartsModule("doConfirmUser", {email: TEST_EMAIL},
      "check_registration");
  });

  asyncTest("doConfirmEmail - start the check_registration service", function() {
    testActionStartsModule("doConfirmEmail", {email: TEST_EMAIL},
      "check_registration");
  });

  asyncTest("doGenerateAssertion - start the generate_assertion service", function() {
    testActionStartsModule('doGenerateAssertion', { email: TEST_EMAIL }, "generate_assertion");
  });


  asyncTest("doStageUser with successful creation - trigger user_staged", function() {
    createController({
      ready: function() {
        var email;
        testHelpers.register("user_staged", function(msg, info) {
          email = info.email;
        });

        controller.doStageUser({ email: TEST_EMAIL, password: "password", ready: function(status) {
          equal(status, true, "correct status");
          equal(email, TEST_EMAIL, "user successfully staged");
          start();
        }});
      }
    });
  });

  asyncTest("doForgotPassword - call the set_password controller with reset_password true", function() {
    testActionStartsModule('doForgotPassword', { email: TEST_EMAIL }, "set_password");
  });
}