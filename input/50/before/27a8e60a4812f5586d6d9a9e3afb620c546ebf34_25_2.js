function() {
    $("#email").val("unregistered@testuser.com");
    $("#password,#vpassword").val(testHelpers.generateString(81));

    testEmailNotSent();
  }