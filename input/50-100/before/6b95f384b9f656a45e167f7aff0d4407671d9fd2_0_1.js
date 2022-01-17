function (err) {
    if (err) {
      // TODO emit if no listeners
      if (self._events && self._events.error &&
         ('function' == typeof self._events.error || self._events.error.length)) {
        self.emit("error", err);
      }
      self.readyState = STATES.disconnected;
      callback(err);
      return;
    }

    self.onOpen();
    callback(err);
  }