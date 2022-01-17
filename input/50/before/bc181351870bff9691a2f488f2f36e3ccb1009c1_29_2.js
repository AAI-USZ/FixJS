function() {
      equal(win.document.location, "http://testuser.com/sign_in?email=unregistered%40testuser.com&return_to=sign_in%23CREATE_EMAIL%3Dunregistered%40testuser.com");
      equal(messageTriggered, true, "primary_user_authenticating triggered");
      start();
    }