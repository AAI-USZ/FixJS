function(msg, info) {
      self.hostname = info.hostname;
      self.siteTOSPP = !!(info.privacyPolicy && info.termsOfService);
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