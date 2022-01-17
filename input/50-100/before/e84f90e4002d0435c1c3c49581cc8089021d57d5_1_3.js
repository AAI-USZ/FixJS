function() {
    storage.addEmail("testuser@testuser.com", {});
    storage.addEmail("testuser2@testuser.com", {});

    createController();

    $("input[type=radio]").eq(0).trigger("click");

    var assertion;

    register("email_chosen", function(msg, info) {
      ok(info.email, "email_chosen message triggered with email");
      start();
    });
    controller.signIn();
  }