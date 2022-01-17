function() {
    $("#email").val("unregistered@testuser.com");
    $("#password,#vpassword").val(testHelpers.generateString(bid.PASSWORD_MAX_LENGTH + 1));

    testEmailNotSent();
  }