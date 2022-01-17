function addVariable(variable, external) {
    assert(variable);
    assert(!variable.frame);
    if (this.variables[variable.name]) {
      debugger;
      return;
    }
    assert(!this.variables[variable.name]);
    variable.external = external;
    variable.frame = this.frame;

    var variables = this.variables;
    var name = variable.name;

    variables[name] = variable;
    if (!external) {
      variable.name = this.freshName(name, variable);
    }

    //logger.info("added variable " + variable + " to scope " + this);
  }