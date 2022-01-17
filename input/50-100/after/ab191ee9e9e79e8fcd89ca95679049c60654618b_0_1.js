function (nameOrPattern, callback) {
  var packet, pattern;
  if (packet = this._packets[nameOrPattern]) {
    pattern    = packet.pattern.slice(0);
    callback   = callback || packet.callback || null;
  } else {
    pattern    = parse(nameOrPattern);
  }

  this._pattern      = pattern;
  this._callback     = callback;
  this._patternIndex = 0;
}