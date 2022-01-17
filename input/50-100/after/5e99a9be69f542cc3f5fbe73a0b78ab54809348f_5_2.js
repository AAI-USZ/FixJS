function WFrameStream__destroySoon() {
  if (this.didDestroySoon) return
  this.didDestroySoon = true

  var self = this
  if (this.draining) {
    if (WFrameStream.VERBOSE) log("WFrameStream__destroySoon: waiting on wstream 'drain'")
    this.once('drain', function(){
      if (WFrameStream.VERBOSE) log("WFrameStream__destroySoon: wstream 'drain'")
      self.destroy()
    })
  }
  else {
    process.nextTick(function(){
      if (WFrameStream.VERBOSE) log("WFrameStream__destroySoon: nextTick destroy()")
      self.destroy()
    })
  }
}