function(){
      var nssClient = new nss.NsSocket(client,{type:'tcp4'})
      self.initSocket(nssClient,cb)
      if (opts.reconnect) applyReconnect()
    }