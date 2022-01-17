function (v) {
  var res = 0, i, ii;
  for (i = 0, ii = this.length; i < ii; i++) {
    res = MathLib.plus(res, MathLib.times(this[i], v[i]));
  }
  return res;
}