function() {
  return new gf.sim.Variable.Quaternion(this.tag, this.flags,
      this.getter_, this.setter_, this.normalized_);
}