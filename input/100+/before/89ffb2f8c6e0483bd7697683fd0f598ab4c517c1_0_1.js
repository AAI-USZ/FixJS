function save (fn) {
  var promise = new Promise(fn)
    , complete = handleSave(promise, this)
    , options = {}

  if (this.options.safe) {
    options.safe = this.options.safe;
  }

  if (this.isNew) {
    // send entire doc
    this.collection.insert(this.toObject({ depopulate: 1 }), options, complete);
    this._reset();
    this.isNew = false;
    this.emit('isNew', false);

  } else {
    var delta = this._delta();
    this._reset();

    if (delta) {
      var where = this._where();
      this.collection.update(where, delta, options, complete);
    } else {
      complete(null);
    }

    this.emit('isNew', false);
  }
}