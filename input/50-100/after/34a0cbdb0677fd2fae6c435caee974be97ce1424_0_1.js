function(p, v) {
    var opn = p["name"]||p;
    var pn = toCamelCase(opn);
    var val = this.values[pn];
    if (typeof v != "undefined") {
      if (!val) {
        val = this.values[pn] = new CSSValue(opn, v);
      } else {
        val.value = v;
      }
    }
    return val;
  }