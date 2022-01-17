function WFrameStream(frap, framelen) {
  Stream.call(this)

  this.frap = frap
  this.framelen = framelen
  this.pos = 0
  this.hdr_sent = false
  this.draining = false

  this.writable = true

  var self = this
  this.frap_listeners = {
    error: function onError(e) {
      self.emit('error', e)
    }
  , end: function onEnd() {
      self.end()
    }
  , close: function onClose(had_error) {
      self.destroy()
    }
  }

  Object.keys(this.frap_listeners).forEach(function(k){
    self.frap.on(k, self.frap_listeners[k])
  })
}