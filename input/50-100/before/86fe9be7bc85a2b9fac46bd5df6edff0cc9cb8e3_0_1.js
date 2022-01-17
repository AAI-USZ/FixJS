function Parser(options) {
  options = options || {};

  this._buffer            = null;
  this._longPacketBuffers = [];
  this._offset            = 0;
  this._packetEnd         = null;
  this._packetHeader      = null;
  this._onPacket          = options.onPacket || function() {};
  this._nextPacketNumber  = 0;
  this._encoding          = 'utf-8';
  this._paused            = false;
}