function(idx) {
    console.assert(typeof idx === 'string');
    console.assert(this.index.hasOwnProperty(idx.toString()));
    return this.index[idx.toString()];
  }