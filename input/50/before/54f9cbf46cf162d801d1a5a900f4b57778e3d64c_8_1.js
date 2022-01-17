function(msg, info) {
      info.privacyURL = self.privacyURL;
      info.tosURL = self.tosURL;
      startAction("doAuthenticate", info);
    }