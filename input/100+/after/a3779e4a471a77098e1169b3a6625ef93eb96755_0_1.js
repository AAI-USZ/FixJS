function(self, args) {
  var sf = this.context.sf;

  this.check_args(args, 0, 1);
  var superklass = args[0];

  if(superklass && superklass.type == 'singleton')
    this.raise(this.e.TypeError, "can't make subclass of singleton class");

  var klass = {
    klass:             this.internal_constants.Class,
    superklass:        superklass ? superklass : this.internal_constants.Object,
    singleton_klass:   null,
    constants:         {},
    class_variables:   {},
    instance_methods:  {},
    ivs:               {},
    toString:          function() { return "#<Class: " + $.class2name(this) + ">"; }
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