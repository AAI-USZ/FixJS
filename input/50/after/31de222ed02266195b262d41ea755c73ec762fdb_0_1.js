function(header, content) {
  this.current.request.headers[header+"".toLowerCase()] = content+"".toLowerCase();
  return this;
}