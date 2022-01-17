function() {
    storage.addEmail("testuser@testuser.com", {});
    storage.addEmail("testuser2@testuser.com", {});
    storage.site.set(testOrigin, "email", "testuser2@testuser.com");

    createController();

    var radioButton = $("input[type=radio]").eq(0);
    ok(radioButton.is(":checked"), "the email address we specified is checked");

    var label = $("label[for=" + radioButton.attr("id") + "]");
    ok(label.hasClass("preselected"), "the label has the preselected class");
  }