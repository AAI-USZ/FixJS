function(buf) {
  var self = this
    , hdrbuf = new Buffer(4)

  hdrbuf.writeUInt32BE(buf.length,0)
  this.sk.write(hdrbuf)

  sent = this.sk.write(buf)
  if (!sent && !this.draining) {
    this.draining = true
    this.sk.once('drain', function(){
      self.draining = false
      self.emit('drain')
    })
  }

  return sent
}