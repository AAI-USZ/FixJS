function remove (fn) {
  if (this._removing) return this;

  var promise = this._removing = new Promise(fn)
    , self = this;

  this.collection.remove({ _id: this._doc._id }, tick(function (err) {
    if (err) {
      this._removing = null;
      return promise.error(err);
    }
    promise.complete();
    self.emit('remove');
  }));

  return this;
}