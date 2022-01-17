function(msg, info) {
      // reset password says the password has been reset, now waiting for
      // confirmation.
      startAction(false, "doResetPassword", info);
    }