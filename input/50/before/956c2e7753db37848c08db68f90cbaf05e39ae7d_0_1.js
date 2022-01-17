function (err, collection) {
    // TODO handle err
    if (!err){
      self.collection = collection;
      Collection.prototype.onOpen.call(self);
    }
  }