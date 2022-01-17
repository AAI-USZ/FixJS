function authenticateUser(email, pass, callback) {
    var self=this;
    user.authenticate(email, pass,
      function (authenticated) {
        if (!authenticated) {
          tooltip.showTooltip("#cannot_authenticate");
        }
        complete(callback, authenticated);
      }, self.getErrorDialog(errors.authenticate, callback));
  }