function Seraph(options) {
  if (typeof options === 'string') {
    options = { endpoint: options };
  };
  this.options = _.extend({}, defaultOptions, options);

  console.log(this.options);
  _.bindAll(this);

  this.node = bindAllTo(this, require('./node'));
  this.rel = bindAllTo(this, require('./relationship'));
  var indexGeneric = bindAllTo(this, require('./index'));

  // Alias & curry seraph.index on seraph.node & seraph.rel
  this.node.index = naan.curry(indexGeneric.add, 'node');
  this.rel.index = naan.curry(indexGeneric.add, 'relationship');
  naan.ecrock(this.node.index, indexGeneric, naan.curry, 'node');
  naan.ecrock(this.rel.index, indexGeneric, naan.curry, 'relationship');

  _.extend(this, this.node);
}