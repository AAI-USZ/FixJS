function() {
      if (WFrameStream.VERBOSE) log("WFrameStream__write: sk 'drain' event")
      self.wrote_cnt += 1
      self.draining = false
      self.emit('drain')
    }