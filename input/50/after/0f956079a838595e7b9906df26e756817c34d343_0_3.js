function(){
      self.initSocket(client,onConnect)
      if (opts.reconnect) applyReconnect()
    }