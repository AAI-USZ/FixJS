function (error) {
    if (self.setHost) delete self.headers.host
    if (self.req._reusedSocket && error.code === 'ECONNRESET') {
      self.agent = {addRequest: ForeverAgent.prototype.addRequestNoreuse.bind(self.agent)}
      self.start()
      self.req.end()
      return
    }
    if (self.timeout && self.timeoutTimer) {
        clearTimeout(self.timeoutTimer);
        self.timeoutTimer = null;
    }
    self.emit('error', error)
  }