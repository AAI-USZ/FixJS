function(data) {
      var self=this;
      data = data || {};

      win = data.window || window;
      add = data.add;
      email = data.email;
      auth_url = data.auth_url;

      var templateData = helpers.extend({}, data, {
        requiredEmail: data.requiredEmail || false,
        privacy_url: data.privacyURL || null,
        tos_url: data.tosURL || null
      });
      self.renderDialog("verify_primary_user", templateData);

      self.click("#cancel", cancel);

      sc.start.call(self, data);
    }