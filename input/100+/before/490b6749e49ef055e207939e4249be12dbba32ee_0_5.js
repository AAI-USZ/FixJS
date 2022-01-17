function WFrameStream__end(buf, enc) {
  if (this.didEnd) return
  this.didEnd = true

  //if (WFrameStream.VERBOSE) log("WFrameStream__end: called")

  assert(arguments.length === 0, "writing on end not supported")
  var flushed
  if (arguments.length > 0) {
    flushed = this.write(buf, enc)
  }

  if (this.pos < this.framelen) {
    this.emit('error', "wstream ended before frame completly written")
    return
  }

  var self = this
  Object.keys(this.frap_listeners).forEach(function(k){
    self.frap.removeListener(k, self.frap_listeners[k])
  })

  this.writable = false
}