function WFrameStream__destroySoon() {
  if (this.didDestroySoon) return
  this.didDestroySoon = true

  //if (WFrameStream.VERBOSE) log("WFrameStream__destroySoon: called")

  var self = this
  if (this.draining) {
    if (WFrameStream.VERBOSE) log("WFrameStream__destroySoon: waiting on wstream 'drain'")
    this.doingDestroySoon = false
    this.once('drain', function(){
      if (WFrameStream.VERBOSE) log("WFrameStream__destroySoon: wstream 'drain'")
      self.doingDestroySoon = false
      self.destroy()
    })
  }
  else {
    //if (WFrameStream.VERBOSE) log("WFrameStream__destroySoon: calling destroy()")
    self.destroy()
  }
}