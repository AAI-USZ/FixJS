function (o) {
    if (this.name === "eval") {
      o.laziness.isClosure = true;
      return this;
    }
    if (typeof o.laziness.isClosure !== "undefined" &&
        !o.laziness.isClosure &&
        this.kind === "variable") {
      var scope = o.scope;
      var variable = scope.variables[this.name];
      var parentVar = scope.getVariable(this.name);

      if (!parentVar) {
        // Should be the identifier for a catch clause
        return this;
      }

      if (!variable && !parentVar.external) {
        o.laziness.isClosure = true;
      }
    }
    return this;
  }