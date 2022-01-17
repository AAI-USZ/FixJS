function(buffer, offset, length, port, address, callback) {
  var self = this;
  console.log("UDP dgrams send", arguments)
  


  //accept buffer as string
  buffer = (typeof buffer === 'string') ? new Buffer(buffer) : buffer;


  //emit directly exception if any
  if (offset >= buffer.length)
    throw new Error('Offset into buffer too large');
  if (offset + length > buffer.length)
    throw new Error('Offset + length beyond buffer length');

  //console.log("what is this buff", buffer)

  self._connect(port, address, function(){
    //console.log(buffer.toString('utf8').length)
    var ab = buffer.toArrayBuffer() //new Uint8Array(buffer.length);
    console.log(new Uint8Array(ab));
    //ab.set(buffer.parent.subarray(buffer.offset, buffer.offset + buffer.length), 0)
    //var ab = buffer.parent.buffer //(new Uint8Array(buffer)).buffer
    //var ab = (new Uint8Array("hello world".split('').map(function(e){return e.charCodeAt(0)}))).buffer;
    console.log([].slice.call((new Uint8Array(ab)), 0))
    socket.write(self._socketID, ab, function(sendResult){
      console.debug("sendResult", sendResult);
    })
  })

  //send it on wire
  // this.sio.emit('dgram-message', {
  //   buffer  : buffer.toString('ascii'),
  //   offset  : offset,
  //   length  : length,
  //   port    : port,
  //   address : address
  // });

  if(callback)
    callback.call(null);
}