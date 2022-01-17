function(source, target) {
  goog.vec.Vec3.setFromArray(
      this.getter_.call(target),
      this.getter_.call(source));
}