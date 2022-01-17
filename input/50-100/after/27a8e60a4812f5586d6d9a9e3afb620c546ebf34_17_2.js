function openPrimaryAuth(winchan, email, baseURL, callback) {
    if(!(email && baseURL)) {
      throw "cannot verify with primary without an email address and URL";
    }

    winchan.open({
      url: "https://login.persona.org/authenticate_with_primary",
      // This is the relay that will be used when the IdP redirects to sign_in_complete
      relay_url: "https://login.persona.org/relay",
      window_features: "width=700,height=375",
      params: helpers.toURL(baseURL, {email: email})
    }, function(error, result) {
      // We have to force a reset of the primary caches because the user's
      // authentication status may be incorrect.
      // XXX a better solution here would be to change the authentication
      // status of the user inside of the cache.
      if(!error) {
        user.resetCaches();
      }
      callback && callback(error, result);
    });
  }