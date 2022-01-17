function handleEmailStaged(actionName, msg, info) {
      // The unverified email has been staged, now the user has to confirm
      // ownership of the address.  Send them off to the "verify your address"
      // screen.
      var actionInfo = {
        email: info.email,
        // password is used to authenticate the user if the verification poll
        // wsapi comes back with "mustAuth" or the user is currently
        // authenticated to the "assertion" level. See issue #2088
        password: self.stagedPassword,
        siteName: self.siteName
      };

      self.stagedEmail = info.email;
      startAction(actionName, actionInfo);
    }