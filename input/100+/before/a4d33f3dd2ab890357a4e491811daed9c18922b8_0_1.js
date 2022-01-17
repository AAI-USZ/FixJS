function handleSave (err, result) {
    if (err) 
    {
      // If the initial insert fails provide a second chance.
      // (If we did this all the time we would break updates)
      if (self.inserting)
      {
        self.isNew = true;
      }
      return promise.error(err);
    }

    self._storeShard();

    var numAffected;
    if (result) {
      numAffected = result.length
        ? result.length
        : result;
    } else {
      numAffected = 0;
    }

    self.emit('save', self, numAffected);
    promise.complete(self, numAffected);
    promise = null;
    self = null;
  }