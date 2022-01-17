function (value) {
  var pattern     = this._pattern[this._patternIndex];
  var little      = pattern.endianness == 'l';
  var bytes       = pattern.bytes;

  this._value     = value;
  this._offset    = little ? 0 : bytes - 1;
  this._increment = little ? 1 : -1;
  this._terminal  = little ? bytes : -1;
}