function handleEmailConfirmed(msg, info) {
      self.email = self.stagedEmail;

      if (info.mustAuth) {
        // If the mustAuth flag comes in, the user has to authenticate.
        // This is not a cancelable authentication.  mustAuth is set
        // after a user verifies an address but is not authenticated
        // to the password level.
        redirectToState("authenticate_specified_email", {
          email: self.stagedEmail,
          mustAuth: info.mustAuth,
          cancelable: !info.mustAuth
        });
      }
      else {
        redirectToState("email_chosen", { email: self.stagedEmail });
      }
    }