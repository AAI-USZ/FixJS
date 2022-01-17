function Channel(sk) {
//  EventEmitter.call(this)
  EventEmitter.call(this)

  this.sk = sk
  this.frap = new Frap(sk, true)
  this.id = 'Channel<'
    + this.sk.remoteAddress
    + ":"
    + this.sk.remotePort
    + ">"

  var self = this
  this.onData = function onData(buf) {
    //read u16 - bigendian; offset 0; == string length
    var off = 0, len = buf.readUInt16BE(off)
    off += 2

    //read buf - utf8 string encoding
    var topic = buf.toString('utf8', off, off+len)
      , rem = buf.slice(off+len)

    self.emit(topic, rem)
    //self.emit("data", topic, rem)
  }

  this.frap.on('data', this.onData)
}