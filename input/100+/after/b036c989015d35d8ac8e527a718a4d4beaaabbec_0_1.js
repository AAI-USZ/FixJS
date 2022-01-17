function (query, opts, fn) {
  if ('function' == typeof opts) {
    fn = opts;
    opts = {};
  }

  var promise = new Promise(this, 'find')

  if (fn) {
    promise.complete(fn);
  }

  // cast
  query = this.cast(query);

  // opts
  opts = this.opts(opts);

  // query
  debug('%s find "%j"', this.name, query);
  var cursor = this.col.find(query, opts);

  if (null == opts.stream) {
    process.nextTick(function () {
      if (promise.listeners('each').length) {
        stream();
      } else {
        cursor.toArray(promise.fulfill);
      }
    });
  } else if (opts.stream) {
    stream();
  } else {
    cursor.toArray(promise.fulfill);
  }

  function stream () {
    cursor.each(function (err, doc) {
      if (err) {
        promise.emit('error', err);
      } else if (doc) {
        promise.emit('each', doc);
      } else {
        promise.emit('success');
      }
    });
  }

  return promise;
}