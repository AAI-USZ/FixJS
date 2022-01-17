function RFrameStream(frap, framelen) {
  Stream.call(this)
  
  this.frap = frap
  this.framelen = framelen
  this.pos = 0

  this.readable = true

  var self = this
  function onPart(buf, pos) {
    if (self.pos + buf.length > self.framelen) {
      self.emit('error', new Error(format("framelen exceeded: framelen=%d; self.pos=%d; buf.length=%d; pos=%d;", self.framelen, self.pos, buf.length, pos)))
      return
    }

    self.emit('data', buf, pos)

    self.pos += buf.length

    if (self.pos === self.framelen) {
      self.destroy()
    }
  }

  this.onPart = onPart
  this.frap.on('part', onPart)
}