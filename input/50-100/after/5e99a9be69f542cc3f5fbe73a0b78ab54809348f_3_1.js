function send(topic, buf, enc) {
  assert.ok(isString(topic))
  if (isString(buf)) {
    buf = new Buffer(buf, enc)
  }
  assert.ok(Buffer.isBuffer(buf))
  
  var strBuf = new Buffer(topic, 'utf8')
    , hdrBuf = new Buffer(2)
  
  hdrBuf.writeUInt16BE(strBuf.length, 0)
  
  this.frap.sendFrame(hdrBuf, strBuf, buf)
}