function() {
    storage.addEmail("third@testuser.com", {});
    storage.addEmail("second@testuser.com", {});
    storage.addEmail("first@testuser.com", {});

    createController();

    var inputs = $(".inputs input[type=radio]");
    equal(inputs.eq(0).val(), "first@testuser.com", "correct email for the first element");
    equal(inputs.eq(1).val(), "second@testuser.com", "correct email for the second element");
    equal(inputs.eq(2).val(), "third@testuser.com", "correct email for the third element");

    equal($("input[type=radio]:checked").length, 0, "if there is no email associated with the site, but there are multiple addresses, do not select an address");
    equal($("label.preselected").length, 0, "no item preselected");
    testElementFocused("input[type=radio]:eq(0)", "if there is no email associated with the site, but there are multiple addresses, focus the first email address");
  }