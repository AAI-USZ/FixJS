function WFrameStream(frap, framelen) {
  Stream.call(this)

  this.frap = frap
  this.framelen = framelen
  this.pos = 0
  this.hdr_sent = false

  this.write_cnt = 0
  this.wrote_cnt = 0
  this.drain_cnt = 0

  this.writable = true

  var self = this
  this.frap_listeners = {
    error: function onError(e) {
      //log("WFrameStream: frap 'error' e=%s;", e);
      self.emit('error', e)
    }
  , end: function onEnd() {
      //log("WFrameStream: frap 'end'");
      self.end()
    }
  , close: function onClose(had_error) {
      //log("WFrameStream: frap 'close' has_error=%j;", has_error);
      self.close()
    }
  }

  Object.keys(this.frap_listeners).forEach(function(k){
    self.frap.on(k, self.frap_listeners[k])
  })
}