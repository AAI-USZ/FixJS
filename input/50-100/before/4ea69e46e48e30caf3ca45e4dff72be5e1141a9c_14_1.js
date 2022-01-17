function(a, b) {
  var frequentA = a & gf.sim.VariableFlag.UPDATED_FREQUENTLY;
  var frequentB = b & gf.sim.VariableFlag.UPDATED_FREQUENTLY;
  return (frequentA - frequentB) || (a.ordinal - b.ordinal);
}