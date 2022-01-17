function(options) {
      var self=this,
          originEmail = user.getOriginEmail();

      self.renderDialog("add_email", options);
      hideHint("addressInfo");

      self.click("#cancel", cancelAddEmail);
      Module.sc.start.call(self, options);
    }