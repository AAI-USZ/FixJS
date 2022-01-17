function(msg, info) {
      info = helpers.extend(info, {
        privacyURL: self.privacyURL,
        tosURL: self.tosURL
      });

      startAction("doAddEmail", info);
    }