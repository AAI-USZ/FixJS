function(msg, info) {
      self.hostname = info.hostname;
      self.privacyURL = info.privacyURL;
      self.tosURL = info.tosURL;
      requiredEmail = info.requiredEmail;

      startAction(false, "doRPInfo", info);

      if (info.email && info.type === "primary") {
        primaryVerificationInfo = info;
        redirectToState("primary_user", info);
      }
      else {
        startAction("doCheckAuth");
      }
    }