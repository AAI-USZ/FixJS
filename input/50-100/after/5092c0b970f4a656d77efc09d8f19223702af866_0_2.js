function(path, options) {
    options = options || {};
    options.type = "require";
    this._deferredAddPath(path, options);
    return this;
  }