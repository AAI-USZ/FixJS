function (v) {
  return this.reduce(function (old, cur, i, w) {
    return MathLib.plus(old, MathLib.times(w[i], v[i]));
  }, 0);
}