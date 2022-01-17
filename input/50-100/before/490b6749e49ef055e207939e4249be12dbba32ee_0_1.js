function RFrameStream__destroy() {
  //if (RFrameStream.VERBOSE) log("RFrameStream__destroy: called")

  if (!this.frap) {
    if (RFrameStream.VERBOSE) log("RFrameStream__destroy: already destroyed")
    return
  }

  var self = this
  Object.keys(this.frap_listeners).forEach(function(k){
    self.frap.removeListener(k, self.frap_listeners[k])
  })

  this.emit('end')

  delete this.frap
  
  this.emit('close')
}