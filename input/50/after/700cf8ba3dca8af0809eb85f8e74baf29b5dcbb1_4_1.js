function addComputedVariable(cellType, fn) {
    var initialValue;
    var vv = this.addVariable(cellType, initialValue);
    var mm = this.addOneWayConstraint([vv], fn);
    runtime.enqueue(mm);
    return vv;
  }