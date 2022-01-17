function(){
    db.createCollection(collectionName, {
      capped : true,
      autoIndexId : true,
      size : collectionSize
    }, function(err, collection){
      if(collection) collection.insert({ignore: 'This works around the bug in mongo-native where capped collections must have at least 1 record before you can setup a tailed cursor.'});
      callback(err, collection);
    });
  }