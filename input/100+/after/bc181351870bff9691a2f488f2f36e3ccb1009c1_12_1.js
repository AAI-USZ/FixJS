function(options) {
      options = options || {};

      addressInfo = null;
      lastEmail = options.email || "";

      var self=this;
      self.renderDialog("authenticate", {
        sitename: user.getHostname(),
        email: lastEmail
      });

      dom.hide(".returning,.start");

      // We have to show the TOS/PP agreements to *all* users here. Users who
      // are already authenticated to their IdP but do not have a Persona
      // account automatically have an account created with no further
      // interaction.  To make sure they see the TOS/PP agreement, show it
      // here.
      if (options.siteTOSPP) {
        dialogHelpers.showRPTosPP.call(self);
      }

      self.bind("#email", "keyup", emailKeyUp);
      self.click("#forgotPassword", forgotPassword);

      Module.sc.start.call(self, options);
      initialState.call(self, options);
    }