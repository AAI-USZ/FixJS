function RFrameStream__destroy() {
  if (RFrameStream.VERBOSE) log("RFrameStream__destroy: called")

  if (!this.frap) {
    if (RFrameStream.VERBOSE) log("RFrameStream__destroy: already destroyed")
    return
  }

  this.frap.removeListener('part', this.onPart)

  this.emit('end')

  //delete this.frap
  this.frap = undefined

  this.emit('close')
}