function (err, collection) {
    if (err) {
      // likely a strict mode error
      self.conn.emit('error', err);
    } else {
      self.collection = collection;
      Collection.prototype.onOpen.call(self);
    }
  }