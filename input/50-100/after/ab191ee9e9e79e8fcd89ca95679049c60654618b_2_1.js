function () {
  var pattern           = this._pattern[this._patternIndex]
  this._repeat      = pattern.repeat
  this._terminated  = ! pattern.terminator
  this._terminates  = ! this._terminated
  this._index       = 0

  delete        this._padding

  // Can't I keep separate indexes? Do I need that zero?
  if (pattern.endianness ==  "x") {
    this._outgoing.splice(this._patternIndex, 0, null);
    if (pattern.padding != null)
      this._padding = pattern.padding
  }
}