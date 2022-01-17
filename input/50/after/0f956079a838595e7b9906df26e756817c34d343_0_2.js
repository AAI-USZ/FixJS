function(){
      var nssClient = new nss.NsSocket(client,{type:'tcp4'})
      self.initSocket(nssClient,onConnect)
      if (opts.reconnect) applyReconnect()
    }