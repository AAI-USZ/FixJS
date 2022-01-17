function() {
    storage.addEmail("testuser2@testuser.com", {});
    storage.addEmail("testuser@testuser.com", {});

    createController();

    equal($("#email_1").is(":checked"), false, "radio button is not selected before click.");

    // selects testuser@testuser.com
    $(".inputs label:eq(1)").trigger("click");
    equal($("#email_1").is(":checked"), true, "radio button is correctly selected");

    // selects testuser2@testuser.com
    $(".inputs label:eq(0)").trigger("click");
    equal($("#email_0").is(":checked"), true, "radio button is correctly selected");
  }