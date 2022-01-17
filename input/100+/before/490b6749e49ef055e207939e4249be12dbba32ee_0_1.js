function onPart(buf, off) {
    if (self.pos + buf.length > self.framelen) {
      self.emit('error', new Error(format("framelen exceeded: framelen=%d; self.pos=%d; buf.length=%d; off=%d;", self.framelen, self.pos, buf.length, off)))
      return
    }

    if (RFrameStream.VERBOSE) log("RFrameStream: onPart: this.framelen=%d; this.pos=%d; off=%d; buf.length=%d;", self.framelen, self.pos, off, buf.length)

    self.emit('data', buf, off)

    self.pos += buf.length

    if (self.pos === self.framelen) {
      //if (RFrameStream.VERBOSE) log("RFrameStream onPart: self.pos === self.framelen")
      self.destroy()
    }
  }