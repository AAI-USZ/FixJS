function Serializer(context) {
  Packet.call(this);
  this.readable = true;
  this._buffer = new Buffer(1024);
  this._streaming = false;
}