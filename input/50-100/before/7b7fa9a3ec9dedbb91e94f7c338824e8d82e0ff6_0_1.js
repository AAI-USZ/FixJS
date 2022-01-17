function() {
    if(self.db.serverConfig.isConnected() && cluster.isWorker) {
      self.collection.insert({data: self.dataLength, ts: new Date(), e:self.byEvent, pid:process.pid});
      self.dataLength = 0;    
      self.byEvent = {};
    }
  }