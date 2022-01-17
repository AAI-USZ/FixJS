function() {
    storage.addEmail("testuser@testuser.com", {});

    createController();

    var radioButton = $("input[type=radio]").eq(0);
    testElementChecked(radioButton, "The lone email address is not checked");
    testElementFocused(radioButton, "the lone email address is still focused for keyboard navigation");

    var label = radioButton.parent();
    equal(label.hasClass("preselected"), false, "the label has no class");
  }