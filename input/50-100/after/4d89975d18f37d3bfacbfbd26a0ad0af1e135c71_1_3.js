function(source, target, t,
    result) {
  var q = gf.sim.Variable.Quaternion.tmp_;
  goog.vec.Quaternion.slerp(
      this.getter_.call(source),
      this.getter_.call(target),
      t,
      q);
  this.setter_.call(result, q);
}