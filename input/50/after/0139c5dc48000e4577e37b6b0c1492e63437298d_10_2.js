function addComputedVariable(cellType, fn) {
    var initialValue;
    var vv = this.addVariable(cellType, initialValue);
    vv.dependsOnSelf = true;
    this.addOneWayConstraint([vv], fn);
    return vv;
  }