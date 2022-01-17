function (shiftable) {
  var i, I;
  // The pattern is given as a pattern name for a named pattern, or else a spot
  // pattern to parse and use immediately.
  if (typeof shiftable[shiftable.length - 1] == 'function')
    var callback = shiftable.pop()
  var nameOrPattern = shiftable.shift()
  this._nameOrPattern(nameOrPattern, callback);

  if (shiftable.length ==  1 &&
      typeof shiftable[0] ==  "object" &&
      ! (shiftable[0] instanceof Array)) {
    object = shiftable.shift()
    this._outgoing = []
    for (i = 0, I = this._pattern.length; i < I; i++) {
      this._outgoing.push(part.name ? object[part.name] : null)
    }
  } else {
    this._outgoing = shiftable
  }

  // Run the outgoing values through field pipelines before we enter the write
  // loop. We need to skip over the blank fields and constants. We also skip
  // over bit packed feilds because we do not apply pipelines to packed fields.
  var skip = 0, j = 0;
  for (i = 0, I = this._outgoing; i < I; i++) {
    var value = this._outgoing[i];
    if (skip) {
      skip--
      continue
    }
    if (this._pattern[j].packing) {
      for (k = 0, K = this._pattern[j].packing; k < K; k++) {
        pack = this._pattern[j].packing[k];
        if (pack.endianness ==  "b") skip++;
      }
      if (skip > 0) skip--;
    } else {
      while (this._pattern[j] &&  this._pattern[j].endianness ==  "x") j++;
      if (! this._pattern[j]) {
        throw new Error("too many fields");
      }
      this._outgoing[i] = this._pipeline(this._pattern[j], value, true)
    }
    j++;
  }
  this._nextField()
  this._nextValue()

  return callback;
}