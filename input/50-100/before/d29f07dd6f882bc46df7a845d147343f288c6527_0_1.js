function(protoProps, classProps) {
    var parent = this;
    if (protoProps.constructorName && !protoProps.hasOwnProperty('constructor')) {
      eval("protoProps.constructor = function " + protoProps.constructorName + " () { parent.apply(this, arguments) };");
    }
    return originalExtend.call(parent, protoProps, classProps);
  }