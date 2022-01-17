function(key, value, ttl, callback) {
    if (typeof key === 'undefined') {
      throw new Error('Invalid key undefined');
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