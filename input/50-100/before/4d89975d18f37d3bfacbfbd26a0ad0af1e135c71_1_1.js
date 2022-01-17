function(source, target, t,
    result) {
  goog.vec.Vec3.lerp(
      this.getter_.call(source),
      this.getter_.call(target),
      t,
      this.getter_.call(result));
}