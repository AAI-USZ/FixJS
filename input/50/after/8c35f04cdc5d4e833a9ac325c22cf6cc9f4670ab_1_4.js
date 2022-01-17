function () {
      console.log('secureConnection')
      self.socket.cleartext.on('data', self._onData.bind(self));
    }