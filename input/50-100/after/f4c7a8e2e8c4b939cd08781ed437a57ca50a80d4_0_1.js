function (event, listener) {
  _$jscoverage['nssocket.js'][137]++;
  if (typeof event === "string") {
    _$jscoverage['nssocket.js'][138]++;
    event = event.split(this.delimiter);
  }
  _$jscoverage['nssocket.js'][140]++;
  return this.on(["data"].concat(event), listener);
}