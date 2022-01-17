function destroy() {
  _$jscoverage['nssocket.js'][160]++;
  this.removeAllListeners();
  _$jscoverage['nssocket.js'][162]++;
  try {
    _$jscoverage['nssocket.js'][163]++;
    this.socket.end();
    _$jscoverage['nssocket.js'][164]++;
    this.socket.destroy();
  }
  catch (err) {
  }
  _$jscoverage['nssocket.js'][167]++;
  this.emit("destroy");
}