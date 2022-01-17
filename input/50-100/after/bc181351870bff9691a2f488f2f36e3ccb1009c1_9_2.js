function(msg, info) {
      var authenticated = info.authenticated;

      if (requiredEmail) {
        self.email = requiredEmail;
        startAction("doAuthenticateWithRequiredEmail", {
          email: requiredEmail,
          // New users are handled by either the "new_user" flow or the
          // "primary_user" flow. The Persona TOS/PP will be shown to users in
          // these stages.
          siteTOSPP: self.siteTOSPP && !user.getOriginEmail()
        });
      }
      else if (authenticated) {
        redirectToState("pick_email");
      } else {
        redirectToState("authenticate");
      }
    }