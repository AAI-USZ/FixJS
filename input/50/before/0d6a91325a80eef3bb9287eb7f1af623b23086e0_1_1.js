function(res, socket, upgradeHead) {
      self.log.debug('Got upgrade')
      self.onSocket(socket, upgradeHead)
      onConnect()
    }