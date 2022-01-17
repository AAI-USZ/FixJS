function onError(e) {
    //log("RFrameStream: 'error' e=%s;", e)
    self.emit('error', e)
    self.destroy()
  }