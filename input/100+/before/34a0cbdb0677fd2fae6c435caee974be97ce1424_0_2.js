function(p, v) {
    var pn = toCamelCase(p);
    var varv = this.vars[pn];
    if (typeof v != "undefined") {
      if (v instanceof c.Variable) {
        varv = this.vars[pn] = v;
      } else {
        if (!varv) {
          varv = this.vars[pn] = cv(p, v);
        } else {
          varv._value = v;
        }
      }
    }
    return varv;
  }