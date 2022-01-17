function(source, target, t,
    result) {
  goog.vec.Quaternion.slerp(
      this.getter_.call(source),
      this.getter_.call(target),
      t,
      this.getter_.call(result));
}