function() {
    createController({
      window: win,
      add: true,
      email: "unregistered@testuser.com",
      auth_url: "http://testuser.com/sign_in"
    });

    // Also checking to make sure the NATIVE is stripped out.
    win.document.location.href = "sign_in";
    win.document.location.hash = "#NATIVE";

    controller.submit(function() {
      equal(win.document.location, "http://testuser.com/sign_in?email=unregistered%40testuser.com&return_to=sign_in%23ADD_EMAIL%3Dunregistered%40testuser.com");
      start();
    });
  }