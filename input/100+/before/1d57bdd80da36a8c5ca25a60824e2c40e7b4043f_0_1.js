function(options, obj, callback) {
    if (Array.isArray(obj)) {
      return async.map(obj, naan.b.curry(this, this.save, options), callback);
    }
    
    var id = this._getId(options, obj, true);

    if (id == null) {
      if (typeof obj !== 'object') {
        return callback(new Error("No data to save"));
      }

      this.node._create(options, obj, callback);
    } else {
      this.node._update(options, obj, callback);
    }
  }