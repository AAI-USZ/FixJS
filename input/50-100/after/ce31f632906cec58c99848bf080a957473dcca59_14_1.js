function authenticateUser(email, pass, callback) {
    var self=this;
    self.publish("password_submit");
    user.authenticate(email, pass,
      function (authenticated) {
        if (authenticated) {
          self.publish("authentication_success");
        }
        else {
          self.publish("authentication_fail");
          tooltip.showTooltip("#cannot_authenticate");
        }
        complete(callback, authenticated);
      }, self.getErrorDialog(errors.authenticate, callback));
  }