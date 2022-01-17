function(type) {
  if (!type.variableTable_) {
    var variableList = [];
    type.declareVariables(variableList);
    type.variableTable_ = new gf.sim.VariableTable(variableList);
  }
  return type.variableTable_;
}