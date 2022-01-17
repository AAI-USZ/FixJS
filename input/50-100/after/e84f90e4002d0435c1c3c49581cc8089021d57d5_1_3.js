function() {
    storage.addEmail("testuser@testuser.com", {});
    storage.addEmail("testuser2@testuser.com", {});

    createController();

    // this should only be triggered once.  testHelpers.register checks this
    // for us.
    var assertion;
    register("email_chosen", function(msg, info) {
      ok(info.email, "email_chosen message triggered with email");
      start();
    });

    // trying to sign in without an email selected shows a tooltip.
    controller.signIn();
    testHelpers.testTooltipVisible();

    // trying to sign in with an email selected operates as expected.
    $("input[type=radio]").eq(0).trigger("click");
    controller.signIn();
  }