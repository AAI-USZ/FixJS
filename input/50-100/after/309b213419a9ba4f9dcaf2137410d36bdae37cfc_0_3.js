function(filename, headers, fn){
  if ('function' == typeof headers) {
    fn = headers;
    headers = {};
  }
  var req = this.head(filename, headers);
  registerReqListeners(req, fn);
  req.end();
  return req;
}