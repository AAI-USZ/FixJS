function(declarationFunction) {
  if (!declarationFunction.variableTable_) {
    var variableList = [];
    declarationFunction(variableList);
    declarationFunction.variableTable_ = new gf.sim.VariableTable(variableList);
  }
  return declarationFunction.variableTable_;
}