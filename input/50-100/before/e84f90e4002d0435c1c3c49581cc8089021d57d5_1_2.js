function() {
    storage.addEmail("testuser@testuser.com", {});

    createController();

    var radioButton = $("input[type=radio]").eq(0);
    equal(radioButton.is(":checked"), true, "The email address is not checked");

    var label = radioButton.parent();
    equal(label.hasClass("preselected"), false, "the label has no class");
  }