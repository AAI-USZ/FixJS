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
    //log("WFrameStream__write: write not flushed; waiting on 'drain'")
    this.frap.sk.once('drain', function() {
      //log("WFrameStream__write: 'drain' event")
      self.emit('drain')
    })
  }

  if (this.pos === this.framelen) {
    if (flushed) {
      // so that write will complete before 'finished' event fires
      process.nextTick(function(){
        self.wrote_cnt += 1
        self.finished(false)
      })
    }
    else {
      //log("frame write complete; write not flushed; waiting on 'drain'")

      function onDrainFinish() {
        //log("onDrainFinish: frame write complete; 'drain' event")
        self.wrote_cnt += 1
        self.finished(true)
      }
      this.frap.sk.once('drain', onDrainFinish)
    }
  }

  return flushed
}