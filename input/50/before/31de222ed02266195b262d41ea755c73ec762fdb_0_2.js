function (key) {
  delete this._setup.request.headers[key+"".toLowerCase()];
  return this;
}