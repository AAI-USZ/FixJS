function () {
      self.socket.cleartext.on('data', self._onData.bind(self));
    }