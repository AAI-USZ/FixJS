function() {
    $("#email").val("testuser@testuser.com");
    var email = helpers.getAndValidateEmail("#email");

    equal(email, "testuser@testuser.com", "valid email returns email");
  }