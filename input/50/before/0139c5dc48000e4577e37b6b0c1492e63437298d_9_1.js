function ConstraintFactory(variables) {
    this.variables = variables;
    this.methods   = [];
    this.cc        = undefined;
    /* We might not ever use this. Oh well. :/ */
    this.solver    = new hd.__private.Solver;
  }