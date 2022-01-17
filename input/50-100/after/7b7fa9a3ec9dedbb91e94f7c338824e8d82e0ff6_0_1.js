function() {
    if(self.db.serverConfig.isConnected() && cluster.isWorker) {
      var object = {data: self.dataLength, ts: new Date(), e:self.byEvent, pid:process.pid};
      self.collection.insert(object);
      self.dataLength = 0;    
      self.byEvent = {};
    }
  }