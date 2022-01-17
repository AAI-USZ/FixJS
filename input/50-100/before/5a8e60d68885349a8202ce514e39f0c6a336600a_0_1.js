function(path, options) {
    options = options || {};
    options.type = "require";
    this._addPath(path, options);
    return this;
  }