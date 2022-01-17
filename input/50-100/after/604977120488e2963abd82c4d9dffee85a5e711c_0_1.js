function () {
    var self = this;
    if (self.heartbeat_timer)
      clearTimeout(self.heartbeat_timer);
    self.heartbeat_timer = setTimeout(
      _.bind(self._heartbeat_timeout, self),
      self.HEARTBEAT_TIMEOUT);
  }