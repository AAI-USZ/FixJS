function(options) {
      var self=this;
      options = options || {};

      self.renderDialog("set_password", {
        password_reset: !!options.password_reset,
        cancelable: options.cancelable !== false
      });

      self.click("#cancel", cancel);

      sc.start.call(self, options);
    }