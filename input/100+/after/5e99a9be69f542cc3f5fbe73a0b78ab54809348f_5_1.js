function RFrameStream(frap, framelen) {
  Stream.call(this)
  
  this.frap = frap
  this.framelen = framelen
  this.pos = 0

  this.pause_cnt = 0
  this.resume_cnt = 0
  this.data_cnt = 0
  
  this.readable = true
  
  var self = this
  function onPart(buf, off) {
    var npos = self.pos + buf.length
    if (npos > self.framelen) {
      self.emit('error', new Error(format("framelen exceeded: framelen=%d; npos=%d; self.pos=%d; buf.length=%d; off=%d;", self.framelen, npos, self.pos, buf.length, off)))
      return
    }

    if (off !== self.pos) log("WTF!")

    //log("RFrameStream: this.framelen=%d; this.pos=%d; off=%d; buf.length=%d;",
    //      self.framelen, self.pos, off, buf.length)

    self.emit('data', buf, off)

    self.pos += buf.length

    if (self.pos === self.framelen) {
      self.destroy()
    }
  }

  function onError(e) {
    //log("RFrameStream: 'error' e=%s;", e)
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