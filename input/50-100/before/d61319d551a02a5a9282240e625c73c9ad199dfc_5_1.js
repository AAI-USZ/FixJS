function(options) {
      var self=this,
          originEmail = user.getOriginEmail();

      self.renderDialog("add_email", options);

      // Only show the RP's TOS/PP if the user has not been to this site
      // before.
      if(!originEmail && options.siteTOSPP) {
        dialogHelpers.showRPTosPP.call(self);
      }

      self.click("#cancel", cancelAddEmail);
      Module.sc.start.call(self, options);
    }