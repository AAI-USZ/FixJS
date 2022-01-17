function(source, target, t,
    result) {
  var v = gf.sim.Variable.Vec3.tmp_;
  goog.vec.Vec3.lerp(
      this.getter_.call(source),
      this.getter_.call(target),
      t,
      v);
  this.setter_.call(result, v);
}