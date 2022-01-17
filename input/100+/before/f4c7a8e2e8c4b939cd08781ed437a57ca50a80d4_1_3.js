function doReconnect() {
    self.retry.waiting = true

    // here for debugging reasons
    assert.isFalse(self.connected, 'before actually reconnect connected must be false')
    assert.isUndefined(self.socket, 'before actually reconnect socket must be destroied')

    self.once('start', function () {
      self.retry.waiting = false
      self.retry.retries = 0
    })

    self.connect.apply(self, self.connectionArgs)
  }