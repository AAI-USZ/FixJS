function WFrameStream__destroy() {
  if (this.isdestroyed) return
  this.isdestroyed = true

  this.close()

  delete this.frap
}