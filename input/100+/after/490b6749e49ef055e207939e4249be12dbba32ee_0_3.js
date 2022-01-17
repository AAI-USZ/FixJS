function WFrameStream(frap, framelen) {
  Stream.call(this)

  this.frap = frap
  this.framelen = framelen
  this.pos = 0
  this.hdr_sent = false
  this.draining = false

  this.writable = true

  this.didEnd = false
  this.didDestroy = false
  this.didDestroySoon = false
}