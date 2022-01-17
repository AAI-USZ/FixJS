function(msg, info) {
      var authenticated = info.authenticated;

      if (requiredEmail) {
        self.email = requiredEmail;
        startAction("doAuthenticateWithRequiredEmail", {
          email: requiredEmail,
          privacyURL: self.privacyURL,
          tosURL: self.tosURL
        });
      }
      else if (authenticated) {
        redirectToState("pick_email");
      } else {
        redirectToState("authenticate");
      }
    }