function(){
    self.db.createCollection(self.mqCollectionName, {
        capped: true,
        size: self.collectionSize
      }, function(err, collection){
        self.startListening(collection);
      });
  }