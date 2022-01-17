function runCallbacks() {
    var callback;
    while (callback = self.callbacks.shift()) {
      try {
        callback.fn.call(callback.context || self, self);
      } catch (e) {
        // TODO: log this
      }
    }
  }