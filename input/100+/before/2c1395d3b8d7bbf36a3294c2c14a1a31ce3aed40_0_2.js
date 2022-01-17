function DefineMap(ary) {
  assert(ary instanceof Array);

  this.index = {};
  this.name = {};
  ary.forEach(function(v) {
    assert(typeof v.index === 'number');
    assert(typeof v.name === 'string');
    assert(!this.index.hasOwnProperty(v.index.toString()));
    assert(!this.name.hasOwnProperty(v.name));

    this.index[v.index.toString()] = v;
    this.name[v.name] = v;
  });
}