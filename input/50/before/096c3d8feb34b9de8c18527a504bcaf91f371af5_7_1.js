function Query(options, callback) {
  this._sql          = options.sql;
  this._callback     = callback;
  this._fieldPackets = [];
  this._rows         = 0;
  this._eofCount     = 0;
}