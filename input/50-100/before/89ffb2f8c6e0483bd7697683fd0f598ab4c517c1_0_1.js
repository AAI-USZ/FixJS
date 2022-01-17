function handleSave (err, result) {
    if (err) return promise.error(err);

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