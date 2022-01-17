function(data) {
      var self=this;
      data = data || {};

      win = data.window || window;
      add = data.add;
      email = data.email;
      auth_url = data.auth_url;

      self.renderDialog("verify_primary_user", {
        email: data.email,
        auth_url: data.auth_url,
        requiredEmail: data.requiredEmail || false,
        personaTOSPP: data.personaTOSPP
      });

      if (data.siteTOSPP) {
        dialogHelpers.showRPTosPP.call(self);
      }

      self.click("#cancel", cancel);

      sc.start.call(self, data);
    }