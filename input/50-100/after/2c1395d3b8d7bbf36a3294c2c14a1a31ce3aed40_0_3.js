function(idx) {
    switch(typeof idx) {
      case 'string':
      console.assert(this.name.hasOwnProperty(idx));
      return this.name[idx];

      case 'number':
      console.assert(this.index.hasOwnProperty(idx.toString()));
      return this.index[idx.toString()];

      default: console.assert(false);
    }
  }