function MethodCompilerContext(compiler, method, savedScope) {
    this.compiler = compiler;
    this.method = method;
    this.worklist = [method.analysis.controlTree];
    this.state = new State();
    this.savedScope = savedScope;
    this.variablePool = new VariablePool();

    /* Initialize local variables. First declare the [this] reference, then ... */
    this.local = [new Variable("this")];

    /* push the method's parameters, followed by ... */
    for (var i = 0; i < method.parameters.length; i++) {
      this.local.push(new Variable(method.parameters[i].name));
    }

    /* push the method's remaining locals.*/
    for (var i = method.parameters.length; i < method.localCount; i++) {
      this.local.push(new Variable(getLocalVariableName(i)));
    }

    this.temporary = [];
    for (var i = 0; i < 20; i++) {
      this.temporary.push(new Variable("s" + i));
    }

    this.header = [];

    var parameterCount = method.parameters.length;
    if (method.needsRest()) {
      this.header.push(this.local[parameterCount + 1] + " = Array.prototype.slice.call(arguments, " + (parameterCount + 1) + ");");
    } else if (method.needsArguments()) {
      this.header.push(this.local[parameterCount + 1] + " = Array.prototype.slice.call(arguments, 1);");
    }

    if (this.local.length > 1) {
      this.header.push("var " + this.local.slice(1).join(", ") + ";");
    }

    if (this.temporary.length > 1) {
      this.header.push("var " + this.temporary.slice(0).join(", ") + ";");
    }

    this.header.push("var " + SCOPE_NAME + " = " + SAVED_SCOPE_NAME + ";");
  }