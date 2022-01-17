function Parser () {
  // Get the number of bytes read since the last call to `@reset()`. 
  this.__defineGetter__('read', function () { return this._bytesRead });
  Packet.call(this)
}