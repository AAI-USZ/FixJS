function(msg, info) {
      // User has forgotten their password, let them reset it.  The response
      // message from the forgot_password controller will be a set_password.
      // the set_password handler needs to know the forgotPassword email so it
      // knows how to handle the password being set.  When the password is
      // finally reset, the password_reset message will be raised where we must
      // await email confirmation.
      self.resetPasswordEmail = info.email;
      startAction(false, "doForgotPassword", info);
    }