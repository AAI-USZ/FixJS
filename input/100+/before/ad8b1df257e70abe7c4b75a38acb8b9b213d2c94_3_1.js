function Movie(root, url, onLoad, onError) {
    DisplayObject.call(this);
    this.root = root;
    this._children = [];
    if (url) {
      root.loadSubMovie(url, onLoad, onError, this);
    }
  }