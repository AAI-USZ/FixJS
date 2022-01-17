function(code, tab){
  var code, usr, tmp, asn, fun, name, type, that, val, __ref;
  usr = [];
  tmp = [];
  asn = [];
  fun = [];
  for (name in __ref = this.variables) {
    type = __ref[name];
    name = name.slice(0, -1);
    if (type == 'var' || type == 'const' || type == 'reuse') {
      ('_' === name.charAt(0) ? tmp : usr).push(name);
    } else if (that = type.value) {
      if (~(val = entab(that, tab)).lastIndexOf('function(', 0)) {
        fun.push("function " + name + val.slice(8));
      } else {
        asn.push(name + " = " + val);
      }
    }
  }
  if (that = usr.concat(tmp, asn).join(', ')) {
    code = tab + "var " + that + ";\n" + code;
  }
  if (that = fun.join("\n" + tab)) {
    return code + "\n" + tab + that;
  } else {
    return code;
  }
}