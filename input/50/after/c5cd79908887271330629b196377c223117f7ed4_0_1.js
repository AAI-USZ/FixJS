function onConnected () {
      var connected = self.connected;
      self.emit(connected ? 'connect' : 'disconnect');
      self.emit('connected', connected);
      self.emit('connectionStatus', connected, self.canConnect);
    }