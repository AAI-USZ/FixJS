function() {
      startAction("doPickEmail", {
        origin: self.hostname,
        siteTOSPP: self.siteTOSPP && !user.getOriginEmail()
      });
    }