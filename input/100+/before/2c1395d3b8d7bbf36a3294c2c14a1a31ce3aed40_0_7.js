function(idx) {
    if(this.schema instanceof Array) {
      assert(typeof idx === 'number');
      assert(idx < this.schema.length);
      return this.value[idx];
    } else switch(typeof idx) {
      case 'string':
      assert(this.name.hasOwnProperty(v.name));
      return this.name[idx];

      case 'number':
      assert(this.index.hasOwnProperty(v.index.toString()));
      return this.index[idx.toString()];

      default: assert(false);
    }
  }