function(data) {
      var self=this;
      data = data || {};

      win = data.window || window;
      add = data.add;
      email = data.email;
      auth_url = data.auth_url;

      var templateData = helpers.extend({}, data, {
        requiredEmail: data.requiredEmail || false
      });
      self.renderDialog("verify_primary_user", templateData);

      if(data.siteTOSPP) {
        dialogHelpers.showRPTosPP.call(self);
      }
      dom.show(".tospp");

      self.click("#cancel", cancel);

      sc.start.call(self, data);
    }