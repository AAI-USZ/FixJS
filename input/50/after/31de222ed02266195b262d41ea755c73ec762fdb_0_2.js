function (key) {
  delete this.current.request.headers[key+"".toLowerCase()];
  return this;
}