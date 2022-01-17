function onConnected () {
      self.emit('connected', self.connected);
      self.emit('connectionStatus', self.connected, self.canConnect);
    }