function (obj) {
        if (obj && ('_meteorRawData' in obj))
          obj = obj._meteorRawData();
        
        self.set(collection, obj._id, obj);
        self.flush();
      }