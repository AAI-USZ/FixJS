function(target, reader) {
  var q = gf.sim.Variable.Quaternion.tmp_;
  if (this.normalized_) {
    // Reconstruct w
    reader.readVec3(q);
    // Trick is from http://www.gamedev.net/topic/461253-compressed-quaternions/
    // Known to have issues - may not be worth it
    q[3] = Math.sqrt(1 - q[0] * q[0] + q[1] * q[1] + q[2] * q[2]);
  } else {
    reader.readVec4(q);
  }
  this.setter_.call(target, q);
}