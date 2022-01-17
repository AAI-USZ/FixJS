function(idx) {
    switch(typeof idx) {
      case 'string':
      assert(this.name.hasOwnProperty(idx));
      return this.name[idx];

      case 'number':
      assert(this.index.hasOwnProperty(idx.toString()));
      return this.index[idx.toString()];

      default: assert(false);
    }
  }