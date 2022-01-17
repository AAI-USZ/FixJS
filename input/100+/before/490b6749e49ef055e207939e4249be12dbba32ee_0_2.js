function RFrameStream(frap, framelen) {
  Stream.call(this)
  
  this.frap = frap
  this.framelen = framelen
  this.pos = 0

  this.readable = true
  
  var self = this
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

  function onError(e) {
    self.emit('error', e)
    self.destroy()
  }
  
  this.frap_listeners = {
    'part'  : onPart
  , 'error' : onError
  }

  Object.keys(this.frap_listeners).forEach(function(ev){
    self.frap.on(ev, self.frap_listeners[ev])
  })

}