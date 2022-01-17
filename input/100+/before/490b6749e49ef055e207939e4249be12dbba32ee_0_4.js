function WFrameStream__write(buf, enc) {
  assert.ok(this.writable)
  if (toString.call(buf) === '[object String]') {
    enc = enc || this.defaultEncoding
    buf = new Buffer(buf, enc)
  }

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
    if (WFrameStream.VERBOSE) log("WFrameStream__write: wrote header hdrbuf.length=%d; flushed=%j", hdrbuf.length, flushed)
  }

  flushed = this.frap.sk.write(buf)
  if (WFrameStream.VERBOSE) log("WFrameStream__write: wrote buf.length=%d; flushed=%j", buf.length, flushed)

  this.pos += buf.length

  var self = this
  if (!flushed) {
    //if (WFrameStream.VERBOSE) log("WFrameStream__write: write not flushed; waiting on sk 'drain'")
    this.draining = true
    this.frap.sk.once('drain', function() {
      if (WFrameStream.VERBOSE) log("WFrameStream__write: sk 'drain' event")
      self.draining = false
      self.emit('drain')
    })
  }

  //do I need to do this?
  if (this.pos === this.framelen) {
    //if (WFrameStream.VERBOSE) log("WFrameStream__write: finished; calling end()")
    this.end()
  }

  return flushed
}