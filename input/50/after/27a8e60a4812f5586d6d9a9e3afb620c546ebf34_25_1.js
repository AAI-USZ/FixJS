function() {
    $("#email").val("unregistered@testuser.com");
    $("#password,#vpassword").val(testHelpers.generateString(bid.PASSWORD_MIN_LENGTH - 1));

    testEmailNotSent();
  }