function handleEmailStaged(actionName, msg, info) {
      // The unverified email has been staged, now the user has to confirm
      // ownership of the address.  Send them off to the "verify your address"
      // screen.
      var actionInfo = {
        email: info.email,
        siteName: self.siteName
      };

      self.stagedEmail = info.email;
      startAction(actionName, actionInfo);
    }