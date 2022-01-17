function() {
    storage.addEmail("testuser+test0@testuser.com", {});
    storage.addEmail("testuser+test1@testuser.com", {});

    createController();

    testElementNotChecked("#email_1", "radio button is not selected before click.");

    // selects testuser+test1@testuser.com
    $(".inputs label:eq(1)").trigger("click");
    testElementChecked("#email_1", "radio button is correctly selected after click");

    // selects testuser+test0@testuser.com
    $(".inputs label:eq(0)").trigger("click");
    testElementChecked("#email_0", "radio button is correctly selected after click");
  }