function(err, collection){
    if(err&&collection) throw err;
    if(collection){
      collection.isCapped(function(err, isCapped){
        checkDoCreate(!isCapped, collection);
      });
    }else{
      createCollection(db, collectionName, collectionSize, callback);
    }
  }