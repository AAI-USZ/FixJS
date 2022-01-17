function(msg, info) {
      info = info || {};
      // reset_password says the user has confirmed that they want to
      // reset their password.  doResetPassword will attempt to invoke
      // the create_user wsapi.  If the wsapi call is successful,
      // the user will be shown the "go verify your account" message.

      // We have to save the staged email address here for when the user
      // verifies their account and user_confirmed is called.
      self.stagedEmail = info.email;
      startAction(false, "doResetPassword", info);
    }