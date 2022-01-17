function() {
    $("#password").val("password");
    $("#vpassword").val("password");

    var password;
    register("password_set", function(msg, info) {
      password = info.password;
    });

    controller.submit(function() {
      equal(password, "password", "password_set message raised with correct password");
      start();
    });
  }