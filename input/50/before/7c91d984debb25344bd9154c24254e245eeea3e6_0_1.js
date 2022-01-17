function(target, writer) {
  if (this.normalized_) {
    // Just ignore w
    writer.writeVec3(this.getter_.call(target));
  } else {
    writer.writeVec4(this.getter_.call(target));
  }
}