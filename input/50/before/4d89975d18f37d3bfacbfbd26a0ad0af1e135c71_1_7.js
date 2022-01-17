function(source, target) {
  goog.vec.Quaternion.setFromArray(
      this.getter_.call(target),
      this.getter_.call(source));
}