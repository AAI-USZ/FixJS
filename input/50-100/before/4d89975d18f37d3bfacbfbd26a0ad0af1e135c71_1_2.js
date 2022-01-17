function(target, reader) {
  if (this.normalized_) {
    // Reconstruct w
    var q = this.getter_.call(target);
    reader.readVec3(q);
    // Trick is from http://www.gamedev.net/topic/461253-compressed-quaternions/
    // Known to have issues - may not be worth it
    q[3] = Math.sqrt(1 - q[0] * q[0] + q[1] * q[1] + q[2] * q[2]);
  } else {
    reader.readVec4(this.getter_.call(target));
  }
}