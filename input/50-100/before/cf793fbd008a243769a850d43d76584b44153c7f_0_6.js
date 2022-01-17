function(name, type, node){
  var t, that;
  if (node && (t = this.variables[name + "."])) {
    if (that = this.READONLY[t] || this.READONLY[type]) {
      node.carp("redeclaration of " + that + " \"" + name + "\"");
    }
    if (t in ['arg', 'function']) {
      return name;
    }
  }
  this.variables[name + "."] = type;
  return name;
}