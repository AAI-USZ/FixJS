function compilation(compiler, methodInfo, scope) {
      this.compiler = compiler;
      var abc = this.compiler.abc;
      var mi = this.methodInfo = methodInfo;
      this.bytecodes = methodInfo.analysis.bytecodes;
      this.state = new State();
      this.variablePool = new VariablePool();
      this.temporary = [];

      /* Initialize local variables, first local is the |this| reference. */
      this.local = [new Variable("this")];

      var freeVariableNames = "abcdefghijklmnopqrstuvwxyz".split("");

      /* Create variables for the method's parameters. */
      for (var i = 0; i < mi.parameters.length; i++) {
        var name = mi.parameters[i].name;
        this.local.push(new Variable(name));
        if (freeVariableNames.indexOf(name) >= 0) {
          delete freeVariableNames[freeVariableNames.indexOf(name)];
        }
      }

      var freshVariableCount = 0;

      function newVariableName() {
        var name = null;
        for (var i = 0; i < freeVariableNames.length; i++) {
          if ((name = freeVariableNames[i])) {
            delete freeVariableNames[i];
            return name;
          }
        }
        return "$l" + freshVariableCount++;
      }

      /* Create variables for the method's remaining locals. */
      for (var i = mi.parameters.length; i < mi.localCount; i++) {
        this.local.push(new Variable(newVariableName()));
      }

      this.prologue = [];
     
      this.prologue.push(new ExpressionStatement(
        call(property(id("Runtime"), "stack.push"), [constant(abc.runtime)])));

      this.prologue.push(new VariableDeclaration("var", [
        new VariableDeclarator(id(SCOPE_NAME), id(SAVED_SCOPE_NAME))
      ]));

      /* Declare local variables. */
      if (this.local.length > 1) {
        this.prologue.push(new VariableDeclaration("var", this.local.slice(1).map(function (x) {
          return new VariableDeclarator(x, null);
        })));
      }

      var parameterCount = mi.parameters.length;
      if (mi.needsRest() || mi.needsArguments()) {
        this.prologue.push(new ExpressionStatement(
          assignment(this.local[parameterCount + 1],
                     call(property(id("Array"), "prototype.slice.call"),
                          [id("arguments"), constant(mi.needsRest() ? parameterCount + 1 : 1)]))));
      }

      /* Initialize default arguments. */
      var argumentCount = property(id("arguments"), "length");
      for (var i = 0; i < parameterCount; i++) {
        var value = mi.parameters[i].value;
        if (value) {
          var local = this.local[i + 1];
          this.prologue.push(new IfStatement(binary(Operator.LT, argumentCount, constant(i + 2)),
                                             new ExpressionStatement(assignment(local, constant(value))),
                                             null));
        }
      }
    }