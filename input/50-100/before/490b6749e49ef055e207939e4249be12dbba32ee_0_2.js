function WFrameStream__destroy() {
  if (this.doingDestroySoon) {
    log("WFrameStream__destroy: called while this.doingDestroySoon set")
    return
  }
  if (this.didDestroy) return
  this.didDestroy = true

  //if (WFrameStream.VERBOSE) log("WFrameStream__destroy: called")

  this.end() //probably redundant but so what

  delete this.frap
  this.emit('close')
}