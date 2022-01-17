function(p_db, mqDB, collectionSize){
      openQueue(p_db, mqDB, collectionSize, function(err, collection){
        self.collection = collection;
        self.listening = true;
        if(self.listeners.length){
          var l = self.listeners.length;
          for(i = 0; i<l; i++){
            self.listeners[i].start();
          }
        }
        if(typeof(callback)=='function') callback(null, self);
      });
    }