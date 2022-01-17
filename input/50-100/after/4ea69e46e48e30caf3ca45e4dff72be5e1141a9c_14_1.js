function(a, b) {
  var frequentA = a.flags & gf.sim.VariableFlag.UPDATED_FREQUENTLY;
  var frequentB = b.flags & gf.sim.VariableFlag.UPDATED_FREQUENTLY;
  return (frequentB - frequentA) || (a.ordinal - b.ordinal);
}