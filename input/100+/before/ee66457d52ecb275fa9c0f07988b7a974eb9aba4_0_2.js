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

      if (!variable) {
        o.laziness.isClosure = true;
      }
    }
    return this;
  }