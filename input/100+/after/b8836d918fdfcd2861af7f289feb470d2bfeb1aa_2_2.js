function complete(resp) {
      o.timeout && clearTimeout(self.timeout)
      self.timeout = null
      while (completeHandlers.length > 0) {
        completeHandlers.shift()(resp)
      }
    }