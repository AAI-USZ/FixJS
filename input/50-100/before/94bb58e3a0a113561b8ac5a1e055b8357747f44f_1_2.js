function(db, collectionName, params, callback) {
  if ('_id' in params) {
    params['_id'] = ObjectIdfromString(params['_id']);
  };
  db.collection(collectionName, function(error, collection) {
    if (error) {
      callback(error);
    } else {
      collection.findAndUpdate(params, callback);
    };
  });
}