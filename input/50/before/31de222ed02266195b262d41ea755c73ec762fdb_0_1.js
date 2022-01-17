function(header, content) {
  this._setup.request.headers[header+"".toLowerCase()] = content+"".toLowerCase();
  return this;
}