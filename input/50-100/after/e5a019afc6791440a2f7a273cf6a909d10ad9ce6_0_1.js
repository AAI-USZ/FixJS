function(key, value, ttl, callback) {
    var err;

    if (typeof key === 'undefined') {
      err = new Error('Invalid key undefined');
      handle.emit('error', err);
      throw err;
    }

    if (typeof ttl === 'function') {
      callback = ttl;
      ttl = undefined;
    }

    sync.set(key, value, ttl);

    if (typeof callback === 'function') {
      callback(undefined, value);
    }
  }