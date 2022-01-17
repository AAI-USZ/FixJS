function(){
      self.initSocket(client,cb)
      if (opts.reconnect) applyReconnect()
    }