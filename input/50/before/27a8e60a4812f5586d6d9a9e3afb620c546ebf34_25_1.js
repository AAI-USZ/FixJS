function() {
    $("#email").val("unregistered@testuser.com");
    $("#password,#vpassword").val("fail");

    testEmailNotSent();
  }