function (count) {
    var self = this;

    if (count < self.RETRY_MIN_COUNT)
      return self.RETRY_MIN_TIMEOUT;

    var timeout = Math.min(
      self.RETRY_MAX_TIMEOUT,
      self.RETRY_BASE_TIMEOUT * Math.pow(self.RETRY_EXPONENT, count));
    // fuzz the timeout randomly, to avoid reconnect storms when a
    // server goes down.
    timeout = timeout * ((Math.random() * self.RETRY_FUZZ) +
                         (1 - self.RETRY_FUZZ/2));
    return timeout;
  }