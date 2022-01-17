function() {
    storage.addEmail("testuser+test0@testuser.com", {});
    storage.addEmail("testuser+test1@testuser.com", {});

    createController();

    equal($("#email_1").is(":checked"), false, "radio button is not selected before click.");

    // selects testuser+test1@testuser.com
    $(".inputs label:eq(1)").trigger("click");
    equal($("#email_1").is(":checked"), true, "radio button is correctly selected");

    // selects testuser+test0@testuser.com
    $(".inputs label:eq(0)").trigger("click");
    equal($("#email_0").is(":checked"), true, "radio button is correctly selected");
  }