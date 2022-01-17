function(msg, info) {
      // reset password says the password has been reset, now waiting for
      // confirmation.
      info = info || {};
      self.stagedEmail = info.email;
      startAction(false, "doResetPassword", info);
    }