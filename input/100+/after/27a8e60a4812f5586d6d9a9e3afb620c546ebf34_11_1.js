function(msg, info) {
      /* A password can be set for one of three reasons - 1) This is a new user
       * or 2) a user is adding the first secondary address to an account that
       * consists only of primary addresses, or 3) an existing user has
       * forgotten their password and wants to reset it.  #1 is taken care of
       * by newUserEmail, #2 by addEmailEmail, #3 by resetPasswordEmail.
       */
      info = _.extend({ email: self.newUserEmail || self.addEmailEmail || self.resetPasswordEmail }, info);

      // stagedPassword is used to authenticate a user if the verification poll
      // comes back with "mustAuth" or the user is not currently authenticated
      // to the "password" level.  See issue #2088
      self.stagedPassword = info.password;

      if(self.newUserEmail) {
        self.newUserEmail = null;
        startAction(false, "doStageUser", info);
      }
      else if(self.addEmailEmail) {
        self.addEmailEmail = null;
        startAction(false, "doStageEmail", info);
      }
      else if(self.resetPasswordEmail) {
        self.resetPasswordEmail = null;
        startAction(false, "doStageResetPassword", info);
      }
    }