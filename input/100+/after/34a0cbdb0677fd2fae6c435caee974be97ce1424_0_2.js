function(p, v) {
    var opn = p["name"]||p;
    var pn = toCamelCase(opn);
    var varv = this.vars[pn];
    if (typeof v != "undefined") {
      if (v instanceof c.Variable) {
        varv = this.vars[pn] = v;
      } else {
        if (!varv) {
          varv = this.vars[pn] = cv(opn, v);
        } else {
          varv._value = v;
        }
      }
    }
    return varv;
  }