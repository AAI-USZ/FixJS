function(req, res) {
  var bufProp = 'buf', headers = copy(this.headers);
  if (this.gzipped && req.headers['accept-encoding'] && /gzip/i.match(req.headers['accept-encoding'])) {
    bufProp = 'gzipped';
    headers['Content-Encoding'] = 'gzip';
    headers['Content-Length'] = this.gzippedLength;
  }
  headers['Date'] = new Date().toUTCString();
  res.writeHead(200, headers);
  res.end(this[bufProp]);
}