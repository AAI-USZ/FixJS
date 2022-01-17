function WFrameStream__destroy() {
  if (this.draining && this.didDestroySoon) return
  if (this.didDestroy) return
  this.didDestroy = true

  this.end() //probably redundent but so what

  delete this.frap

  this.emit('close')
}