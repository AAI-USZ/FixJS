function WFrameStream__write(buf, enc) {
  assert.ok(this.writable)
  if (toString.call(buf) === '[object String]') {
    enc = enc || this._defaultEncoding
    buf = new Buffer(buf, enc)
  }
  //log("WFrameStream: write() called: buf.length=%d;", buf.length)

  if (this.pos + buf.length > this.framelen) {
    this.emit('error', "tried to send to beyond the end of the frame")
    return
  }

  var flushed, hdrbuf
  if (!this.hdr_sent) {
    hdrbuf = new Buffer(4)
    hdrbuf.writeUInt32BE(this.framelen, 0)
    this.hdr_sent = true
    flushed = this.frap.sk.write(hdrbuf)
  }

  this.write_cnt += 1
  flushed = this.frap.sk.write(buf)

  this.pos += buf.length

  var self = this
  if (!flushed) {
    if (WFrameStream.VERBOSE) log("WFrameStream__write: write not flushed; waiting on sk 'drain'")
    this.draining = true
    this.frap.sk.once('drain', function() {
      if (WFrameStream.VERBOSE) log("WFrameStream__write: sk 'drain' event")
      self.wrote_cnt += 1
      self.draining = false
      self.emit('drain')
    })
  }
  else this.wrote_cnt += 1

  if (this.pos === this.framelen) {
    // this.destroySoon() gurantees this.destroy() will not be called
    // "synchronously" with write(); ie. write() will complete and then
    // either on wstream 'drain' event or on nextTick will call destroy()
    this.destroySoon()
  }

  return flushed
}