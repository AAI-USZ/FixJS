function(msg, info) {
      // a user who lands here is not authenticated with their identity
      // provider.
      _.extend(info, {
        add: !!addPrimaryUser,
        email: email,
        requiredEmail: !!requiredEmail,

        // In the requiredEmail flow, a user who is not authenticated with
        // their primary will be sent directly to the "you must verify
        // with your IdP" screen.
        //
        // Show the siteTOSPP to all requiredEmail users who have never visited
        // the site before.
        siteTOSPP: requiredEmail && self.siteTOSPP && !user.getOriginEmail(),

        // Show the persona TOS/PP only to requiredEmail users who are creating
        // a new account.
        personaTOSPP: requiredEmail && !addPrimaryUser
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