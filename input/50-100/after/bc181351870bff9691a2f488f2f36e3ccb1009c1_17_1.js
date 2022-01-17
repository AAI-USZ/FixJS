function(options) {
      var self=this;
      options = options || {};

      self.renderDialog("set_password", {
        password_reset: !!options.password_reset,
        cancelable: options.cancelable !== false,
        personaTOSPP: options.personaTOSPP
      });

      if (options.siteTOSPP) {
        dialogHelpers.showRPTosPP.call(self);
      }

      self.click("#cancel", cancel);

      sc.start.call(self, options);
    }