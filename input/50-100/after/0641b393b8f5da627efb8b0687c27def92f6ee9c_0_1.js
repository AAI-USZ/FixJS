function remove (fn) {
  if (this._removing) return this;

  var promise = this._removing = new Promise(fn)
    , where = this._where()
    , self = this;

  this.collection.remove(where, tick(function (err) {
    if (err) {
      this._removing = null;
      return promise.error(err);
    }
    promise.complete();
    self.emit('remove');
  }));

  return this;
}