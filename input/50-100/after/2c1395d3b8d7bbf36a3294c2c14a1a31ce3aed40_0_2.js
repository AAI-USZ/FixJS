function(v) {
    console.assert(typeof v.index === 'number');
    console.assert(typeof v.name === 'string');
    console.assert(!this.index.hasOwnProperty(v.index.toString()));
    console.assert(!this.name.hasOwnProperty(v.name));

    this.index[v.index.toString()] = v;
    this.name[v.name] = v;
  }