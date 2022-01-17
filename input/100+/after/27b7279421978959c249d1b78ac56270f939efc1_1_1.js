function(options) {
      var self=this;
      options = options || {};

      self.checkRequired(options, "email", "siteName");
      var templateData = {
        email: options.email,
        required: options.required,
        siteName: options.siteName
      };
      self.renderWait("confirm_email", templateData);

      self.email = options.email;
      self.verifier = options.verifier;
      self.verificationMessage = options.verificationMessage;
      self.required = options.required;
      self.password = options.password;

      self.click("#back", self.back);

      Module.sc.start.call(self, options);
    }