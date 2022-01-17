function() {
    storage.addEmail("testuser2@testuser.com", {});
    storage.addEmail("testuser@testuser.com", {});

    createController();

    testElementNotChecked("#mail_1", "radio button is not selected before click.");

    // selects testuser@testuser.com
    $(".inputs label:eq(1)").trigger("click");
    testElementChecked("#email_1", "radio button is correctly selected after click");

    // selects testuser2@testuser.com
    $(".inputs label:eq(0)").trigger("click");
    testElementChecked("#email_0", "radio button is correctly selected after click");
  }