function() {
    createController({ email: "testuser@testuser.com" });
    ok($("#newEmail").val(), "testuser@testuser.com", "email prepopulated");
  }