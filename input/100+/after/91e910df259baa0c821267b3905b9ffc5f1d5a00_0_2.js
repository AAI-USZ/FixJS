function() {
  var bufs = Array.prototype.slice.call(arguments)

  if (bufs.length === 1 && Array.isArray(bufs[0])) {
    bufs = bufs[0]
  }

  if (bufs.length < 1) return

  var framelen=0, i
  for (i=0; i<bufs.length; i++) {
    framelen += bufs[i].length
  }

  var self = this
    , hdrbuf = new Buffer(4)

  hdrbuf.writeUInt32BE(framelen,0)
  this.sk.write(hdrbuf)

  for (i=0; i<bufs.length; i++) {
    sent = this.sk.write(bufs[i])
    if (!sent && !this.draining) {
      this.draining = true
      this.sk.once('drain', function(){
        self.draining = false
        self.emit('drain')
      })
    }
  }

  return sent
}