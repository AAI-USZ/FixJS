function(msg, info) {
      info = helpers.extend(info, {
        add: !!addPrimaryUser,
        email: email,
        requiredEmail: !!requiredEmail,
        privacyURL: self.privacyURL,
        tosURL: self.tosURL
      });

      if (primaryVerificationInfo) {
        primaryVerificationInfo = null;
        if (requiredEmail) {
          startAction("doCannotVerifyRequiredPrimary", info);
        }
        else if (info.add) {
          // Add the pick_email in case the user cancels the add_email screen.
          // The user needs something to go "back" to.
          redirectToState("pick_email");
          redirectToState("add_email", info);
        }
        else {
          redirectToState("authenticate", info);
        }
      }
      else {
        startAction("doVerifyPrimaryUser", info);
      }
    }