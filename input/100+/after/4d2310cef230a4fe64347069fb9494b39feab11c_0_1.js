function (listeners, args, values, strategyFn, callback) {
  if (listeners) {
    var listener  = listen(values);
    var scope     = { callback : listener };
    emit(listeners.slice(), scope, args);
    listener.then(function (err, values) {
      if (err) {
        handleError(callback, err);
      } else if (callback) {
        callback(null, strategyFn(values));
      }
    });
  } else if (callback) {
    callback(null, strategyFn(values));
  }
}