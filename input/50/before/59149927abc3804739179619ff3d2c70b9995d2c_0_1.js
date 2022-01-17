function runCallbacks() {
    var callback;
    while (callback = self.callbacks.shift()) {
      callback.fn.call(callback.context || self, self);
    }
  }