function(s, properties) {
  for (var i = 0, n = properties.length; i < n; i++) {
    var p = properties[i], v = p.value; // assume case 2 (constant)
    switch (p.type) {
      case 0:
      case 1: v = this.scene.defs.values[p.name]; break;
      case 3: v = v.apply(this, pv.Mark.stack); break;
    }
    s[p.name] = v;
  }
}