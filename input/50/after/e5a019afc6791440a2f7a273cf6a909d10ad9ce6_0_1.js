function(key, callback) {
    var value = sync.get(key);

    if (typeof value === 'undefined') {
      handle.emit('miss', key);
    }

    callback(undefined, value);
  }