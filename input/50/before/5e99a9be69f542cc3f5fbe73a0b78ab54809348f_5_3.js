function WFrameStream__close() {
  if (this.isclosed) return
  this.isclosed = true

  this.end() //probably redundent but so what

  this.emit('close')
}