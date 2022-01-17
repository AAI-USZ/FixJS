function () {
    if (self._aborted) return
    
    if (self.body) {
      if (Array.isArray(self.body)) {
        self.body.forEach(function(part) {
          self.write(part)
        })
      } else {
        self.write(self.body)
      }
      self.end()
    } else if (self.requestBodyStream) {
      console.warn("options.requestBodyStream is deprecated, please pass the request object to stream.pipe.")
      self.requestBodyStream.pipe(self)
    } else if (!self.src) {
      self.headers['content-length'] = 0
      self.end()
    }
    self.ntick = true
  }