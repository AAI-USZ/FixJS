function(options) {
      var self=this,
          templateData = helpers.extend({}, options, {
            privacy_url: options.privacyURL || null,
            tos_url: options.tosURL || null
          });

      self.renderDialog("add_email", templateData);

      self.click("#cancel", cancelAddEmail);
      Module.sc.start.call(self, options);
    }