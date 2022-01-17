function verify(callback) {
    this.publish("primary_user_authenticating");

    // set up some information about what we're doing
    win.sessionStorage.primaryVerificationFlow = JSON.stringify({
      add: add,
      email: email
    });

    var url = helpers.toURL(auth_url, {email: email});
    
    win.document.location = url;

    complete(callback);
  }