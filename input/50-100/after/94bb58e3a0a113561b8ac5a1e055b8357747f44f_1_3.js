function(db, collectionName, params, callback) {
  if ('_id' in params) {
    params['_id'] = idFromString(params['_id']);
  };
  db.collection(collectionName, function(error, collection) {
    if (error) {
      callback(error);
    } else {
      collection.remove(params, callback);
    };
  });
}