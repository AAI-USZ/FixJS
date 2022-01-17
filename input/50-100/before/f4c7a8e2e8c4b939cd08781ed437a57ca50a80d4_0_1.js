function (event, listener) {
  _$jscoverage['nssocket.js'][136]++;
  if (typeof event === "string") {
    _$jscoverage['nssocket.js'][137]++;
    event = event.split(this.delimiter);
  }
  _$jscoverage['nssocket.js'][139]++;
  return this.once(["data"].concat(event), listener);
}