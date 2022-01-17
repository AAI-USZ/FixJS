function (obj, key, parent, type) {
    // find any value using _id
    if(key === 'id' && parent.id) {
      parent._id = parent.id;
      delete parent.id;
    }
  }