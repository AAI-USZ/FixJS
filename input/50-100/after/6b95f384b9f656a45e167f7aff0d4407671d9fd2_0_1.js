function (err) {
    if (err) {
      self.readyState = STATES.disconnected;
      self.error(err, callback);
      return;
    }

    self.onOpen();
    callback && callback();
  }