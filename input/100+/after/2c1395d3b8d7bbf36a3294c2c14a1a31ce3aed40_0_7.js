function(idx) {
    if(this.schema instanceof Array) {
      console.assert(typeof idx === 'number');
      console.assert(idx < this.schema.length);
      return this.value[idx];
    } else switch(typeof idx) {
      case 'string':
      console.assert(this.name.hasOwnProperty(v.name));
      return this.name[idx];

      case 'number':
      console.assert(this.index.hasOwnProperty(v.index.toString()));
      return this.index[idx.toString()];

      default: console.assert(false);
    }
  }