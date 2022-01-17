function(db, collection, id, params, callback) {
  id = ObjectIdfromString(id);
  db.collection(collection, function(error, collection) {
    collection.find({ _id : id }).toArray(callback);
  });
}