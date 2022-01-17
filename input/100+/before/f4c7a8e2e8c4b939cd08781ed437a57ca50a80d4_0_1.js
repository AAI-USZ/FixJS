function end() {
  _$jscoverage['nssocket.js'][159]++;
  var hadErr;
  _$jscoverage['nssocket.js'][160]++;
  this.connected = false;
  _$jscoverage['nssocket.js'][162]++;
  try {
    _$jscoverage['nssocket.js'][163]++;
    this.socket.end();
  }
  catch (err) {
    _$jscoverage['nssocket.js'][165]++;
    hadErr = true;
    _$jscoverage['nssocket.js'][166]++;
    this.emit("error", err);
  }
  _$jscoverage['nssocket.js'][169]++;
  this.emit("close", hadErr);
}