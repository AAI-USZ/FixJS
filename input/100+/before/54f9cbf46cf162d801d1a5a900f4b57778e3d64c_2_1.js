function(options) {
      options = options || {};

      addressInfo = null;
      lastEmail = options.email || "";

      var self=this;
      self.renderDialog("authenticate", {
        sitename: user.getHostname(),
        email: lastEmail,
        privacy_url: options.privacyURL,
        tos_url: options.tosURL
      });

      $(".returning,.start").hide();

      self.bind("#email", "keyup", emailKeyUp);
      self.click("#forgotPassword", forgotPassword);

      Module.sc.start.call(self, options);
      initialState.call(self, options);
    }