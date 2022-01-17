function(self) {
  var sf = this.context.sf;

  var klass = {
    klass:             this.internal_constants.Module,
    singleton_klass:   null,
    constants:         {},
    class_variables:   {},
    instance_methods:  {},
    ivs:               {},
    toString:          function() { return "#<Module: " + $.class2name(this) + ">"; }
  };

  var cref = [ klass ];
  for(var i = 0; i < sf.block.stack_frame.cref.length; i++) {
    cref.push(sf.block.stack_frame.cref[i]);
  }

  var sf_opts = {
    self: klass,
    ddef: klass,
    cref: cref,

    outer: sf.block.stack_frame
  };

  this.execute(sf_opts, sf.block, [ klass ]);

  return klass;
}