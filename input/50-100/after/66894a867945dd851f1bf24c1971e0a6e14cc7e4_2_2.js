function(msg, info) {
      // user must authenticate with their password, kick them over to
      // the required email screen to enter the password.
      startAction("doAuthenticateWithRequiredEmail", {
        email: info.email,
        secondary_auth: true,
        cancelable: ("cancelable" in info) ? info.cancelable : true,
        // This is a user is already authenticated to the assertion
        // level who has chosen a secondary email address from the
        // pick_email screen. They would have been shown the
        // siteTOSPP there.
        siteTOSPP: false
      });
      complete(info.complete);
    }