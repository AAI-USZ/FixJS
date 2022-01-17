function(idx) {
    assert(typeof idx === 'string');
    assert(this.index.hasOwnProperty(idx.toString()));
    return this.index[idx.toString()];
  }