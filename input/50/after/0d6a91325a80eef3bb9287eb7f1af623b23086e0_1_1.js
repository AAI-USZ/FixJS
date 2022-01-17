function(res, socket, upgradeHead) {
      debug('Got upgrade')
      self.onSocket(socket, upgradeHead)
      onConnect()
    }