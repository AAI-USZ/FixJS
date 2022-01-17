function (query) {
  // private mongo ids can be anywhere in a query object
  // walk the object recursively replacing id with _id
  // NOTE: if you are implementing your own Store,
  // you probably wont need to do this if you want sotre ids
  // as 'id'

  if(query.id && typeof query.id === 'object') {
    query._id = query.id;
    delete query.id;
  }

  scrub(query, function (obj, key, parent, type) {
    // find any value using _id
    if(key === 'id' && parent.id) {
      parent._id = parent.id;
      delete parent.id;
    }
  });
}