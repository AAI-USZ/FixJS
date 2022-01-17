function() {
    this._super();
    this.dirty = new Set();
    this.counter = getPath(this, 'manyArray.length');
  }