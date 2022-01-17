function(p, v) {
    var pn = toCamelCase(p);
    var val = this.values[pn];
    if (typeof v != "undefined") {
      if (!val) {
        val = this.values[pn] = new CSSValue(p, v);
      } else {
        val.value = v;
      }
    }
    return val;
  }