function (n) {
  var res = [], i, ii;
  if (typeof n === "number" || n.type === "complex") {
    return this.map(function (x) {
      return MathLib.times(x, n);
    });
  }
  if (n.type === "matrix") {
    res = n.toColVectors();
    for (i = 0, ii = res.length; i < ii; i++) {
      res[i] = this.scalarProduct(res[i]);
    }
    return MathLib.vector(res);
  }
}