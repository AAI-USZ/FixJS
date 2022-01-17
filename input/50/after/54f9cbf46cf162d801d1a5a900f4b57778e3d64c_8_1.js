function(msg, info) {
      info = info || {};
      info.siteTOSPP = self.siteTOSPP;
      startAction("doAuthenticate", info);
    }