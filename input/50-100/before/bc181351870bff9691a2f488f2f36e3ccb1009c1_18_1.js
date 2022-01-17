function verify(callback) {
    this.publish("primary_user_authenticating");

    // replace any hashes that may be there already.
    var returnTo = win.document.location.href.replace(/#.*$/, "");

    var type = add ? "ADD_EMAIL" : "CREATE_EMAIL";
    var url = helpers.toURL(auth_url, {
      email: email,
      return_to: returnTo + "#" + type + "=" +email
    });

    win.document.location = url;

    complete(callback);
  }