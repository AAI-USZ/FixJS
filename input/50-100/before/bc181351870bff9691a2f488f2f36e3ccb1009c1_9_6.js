function(msg, info) {
      self.stagedEmail = info.email;
      info.required = !!requiredEmail;
      startAction("doConfirmEmail", info);
    }