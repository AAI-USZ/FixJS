function(variableList) {
  // Sort by priority in a stable way
  // We do this with a hack of using the ordinals if the two priorities are the
  // same
  // We can modify the variables in the list pre-clone because anyone actually
  // using the ordinals from inputs will reset them after they clone
  for (var n = 0; n < variableList.length; n++) {
    variableList[n].ordinal = n;
  }
  variableList.sort(gf.sim.Variable.sortByPriority);

  /**
   * Maps variable tags to variables, allowing for lookup by tag.
   * @private
   * @type {!Object.<number, !gf.sim.Variable>}
   */
  this.ordinalLookup_ = {};

  /**
   * Variables that have their {@see gf.sim.VariableFlag#PREDICTED} bit set.
   * @private
   * @type {!Array.<!gf.sim.Variable>}
   */
  this.predictedVariables_ = [];

  /**
   * Variables that have their {@see gf.sim.VariableFlag#INTERPOLATED} bit set.
   * @private
   * @type {!Array.<!gf.sim.Variable>}
   */
  this.interpolatedVariables_ = [];

  /**
   * List, in sorted ordinal order, of all variables.
   * @private
   * @type {!Array.<!gf.sim.Variable>}
   */
  this.variables_ = new Array(variableList.length);
  for (var n = 0; n < variableList.length; n++) {
    // Clone variable so that different types can have different ordinals
    var v = variableList[n].clone();
    this.variables_[n] = v;
    this.ordinalLookup_[v.tag] = v;

    // Assign ordinal
    v.ordinal = n;

    // Add to fast access arrays
    if (v.flags & gf.sim.VariableFlag.PREDICTED) {
      this.predictedVariables_.push(v);
    }
    if (v.flags & gf.sim.VariableFlag.INTERPOLATED) {
      this.interpolatedVariables_.push(v);
    }
  }
}