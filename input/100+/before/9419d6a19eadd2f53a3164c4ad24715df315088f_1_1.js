function() {
  if (!this.transformDirty_) {
    return;
  }
  this.transformDirty_ = false;

  var state = this.getState();
  var position = state.getPosition();
  var rotation = state.getRotation();
  var scale = state.getScale();

  // Bounding sphere
  this.boundingSphere_[0] = position[0];
  this.boundingSphere_[1] = position[1];
  this.boundingSphere_[2] = position[2];
  this.boundingSphere_[3] = state.getBoundingRadius() *
      Math.max(scale[0], Math.max(scale[1], scale[2]));

  // Transform
  var transform = this.transform_;
  goog.vec.Quaternion.toRotationMatrix4(
      state.rotation, transform);
  gf.vec.Mat4.multScalePost(
      transform, scale[0], scale[1], scale[2], transform);
  gf.vec.Mat4.multTranslationPre(
      position[0], position[1], position[2], transform, transform);

  // Notify parent scene that this transform changed
  // TODO(benvanik): something cleaner, perhaps an interface
  var parent = this.getParent();
  if (parent && parent.childTransformed) {
    parent.childTransformed(this);
  }
}