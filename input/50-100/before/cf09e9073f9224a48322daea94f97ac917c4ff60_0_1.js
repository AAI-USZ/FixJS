function(name, type, node){
  var t;
  if (node) {
    t = this.variables[name + "."];
    if (t && (type === 'const' || type === 'function') || (t === 'const' || t === 'function')) {
      node.carp("redeclaration of read-only variable \"" + name + "\"");
    }
    if (t === 'arg' || t === 'function') {
      return name;
    }
  }
  this.variables[name + "."] = type;
  return name;
}