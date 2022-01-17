function complete(resp) {
      var i
      o.timeout && clearTimeout(self.timeout)
      self.timeout = null
      for (i = 0; i < completeHandlers.length; i++) {
        completeHandlers[i](resp)
      }
    }