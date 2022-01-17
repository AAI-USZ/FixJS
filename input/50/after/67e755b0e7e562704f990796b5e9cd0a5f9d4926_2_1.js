function() {
      // The reason we send to PZH is because PZH acts as a point of synchronization for connecting PZP"s
      self.prepMsg(self.sessionId, self.config.pzhId, "pzpDetails", global.pzpServerPort);
      self.pzptlsServerState = global.states[2];
      callback.call(self, "startedPZP");
    }