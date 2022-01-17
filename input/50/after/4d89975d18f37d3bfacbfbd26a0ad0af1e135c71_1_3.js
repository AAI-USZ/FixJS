function(target, reader) {
  var v = gf.sim.Variable.Vec3.tmp_;
  reader.readVec3(v);
  this.setter_.call(target, v);
}