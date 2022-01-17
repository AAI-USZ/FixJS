function Query(options, callback) {
  this._sql          = options.sql;
  this._callback     = callback;
  this._fieldPackets = [];
  this._rows         = [];
  this._eofCount     = 0;

  this.RowDataPacket = null;
}